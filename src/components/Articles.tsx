import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { API_BASE_URL } from '../constants';

interface Article {
  _id: string;
  title: string;
  date: string;
  description: string;
  fullContent: string;
  images: string[];
}

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div id="articles" className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Articles
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest activities and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/articles/${article._id}`)}
            >
              <div className="aspect-w-16 aspect-h-9">
                {article.images && article.images.length > 0 ? (
                  <img
                    src={article.images[0]}
                    alt={article.title}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center text-sm text-red-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-xs sm:text-sm">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
