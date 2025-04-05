import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

import { API_BASE_URL } from '../constants';

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  description: string;
  fullContent: string;
  images: string[];
}

const News = () => {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`); // Your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNewsItems(data);
    } catch (err) {
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = newsItems.slice(startIndex, startIndex + itemsPerPage);

  const ImageGallery = ({ images }: { images: string[] }) => (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {images.map((image, index) => (
        <img
          key={index}
          src={`${image}`}
          alt={`News image ${index + 1}`}
          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSelectedImage(image)} // set just the filename
        />
      ))}
    </div>
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const getImageUrl = (filename: string) => {
    return `${filename}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div id="news" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">News & Updates</h2>
          <p className="text-lg text-gray-600">Stay informed about our latest activities and achievements</p>
        </div>

        {selectedNews === null ? (
          <>
            <div className="relative">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 z-10"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar"
              >
                {currentNews.map((item, index) => (
                  <div
                    key={item._id}
                    className="min-w-[300px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedNews(index)}
                  >
                    {item.images.length > 0 && (
                      <img
                        src={getImageUrl(item.images[0])}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-red-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-gray-600 line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 z-10"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center text-red-700 hover:text-red-800 mb-6"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to News
            </button>

            <h3 className="text-3xl font-bold mb-4">{currentNews[selectedNews].title}</h3>
            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(currentNews[selectedNews].date).toLocaleDateString()}
            </div>

            <div className="prose max-w-none">
              {currentNews[selectedNews].fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>

            <ImageGallery images={currentNews[selectedNews].images} />
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={`${selectedImage}`}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default News;