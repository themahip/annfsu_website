import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft } from 'lucide-react';
import { API_BASE_URL } from '../constants';

interface Article {
  _id: string;
  title: string;
  date: string;
  description: string;
  fullContent: string;
  images: string[];
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchArticle();
    } else {
      setError('No article ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data._id) {
        throw new Error('Invalid article data received');
      }
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error || 'Article not found'}</span>
          <button
            onClick={() => navigate('/articles')}
            className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 w-full sm:w-auto"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <button
          onClick={() => navigate('/articles')}
          className="flex items-center text-red-700 hover:text-red-800 mb-6 text-sm sm:text-base"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
          Back to Articles
        </button>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6 text-sm sm:text-base">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {new Date(article.date).toLocaleDateString()}
            </div>

            {article.images && article.images.length > 0 ? (
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                  src={article.images[0]}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
            )}

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{article.fullContent}</p>
            </div>

            {article.images && article.images.length > 1 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">More Images</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {article.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1">
                      <img
                        src={image}
                        alt={`${article.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
