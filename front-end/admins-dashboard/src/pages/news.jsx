import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import NewsCard from "../components/newsCardAdmin";
import { newsApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import NewsForm from "../components/newsForm";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Home", icon: "🏠" },
  { name: "Universities", icon: "🏛️" },
  { name: "Resources", icon: "📚" },
  { name: "Events", icon: "🎉" },
  { name: "News", icon: "📰" },
  { name: "Users", icon: "👥" },
  { name: "Event RSVP", icon: "📝" },
];

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNews, setCurrentNews] = useState(null); // For updating an news

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!error) {
      fetchNews(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchNews = async (currentPage) => {
    try {
      await requestHandler(
        () => newsApi.getAllNews(currentPage),
        setLoading,
        (data) => {
          setNews(data.news);
          setTotalPages(data.pages);
        },
        (error) => setError(error)
      );
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleDelete = async (newId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (confirmDelete) {
      try {
        await newsApi.deleteNews(newId);
        fetchNews(currentPage); // Refresh news after deletion
      } catch (error) {
        console.error("Error deleting news:", error);
        setError(error);
      }
    }
  };

  const handleUpdate = (news) => {
    setCurrentNews(news);
    setShowForm(true); // Show the form for updating the news
  };

  const handleCreate = () => {
    setCurrentNews(null); // Clear current news for new creation
    setShowForm(true); // Show the form for creating a new news
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentNews) {
        await newsApi.updateNews(currentNews._id, formData); // Update news
      } else {
        await newsApi.createNews(formData); // Create news
      }
      setShowForm(false);
      fetchNews(currentPage); // Refresh news after creating/updating
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error);
    }
  };

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/admin/${item.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start mb-2 text-white hover:bg-gray-700"
              onClick={() => handleItemClick(item.name)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage news</h1>
        <Button onClick={handleCreate} className="mb-4">
          Add news
        </Button>

        {showForm && (
          <NewsForm
            news={currentNews}
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching news: {error.message}</p>
        ) : news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((news) => (
              <NewsCard
                key={news._id}
                title={news.title}
                date={news.status}
                // note={news.content}
                imageUrl={news.image}
              >
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleUpdate(news)}>Update</Button>
                  <Button
                    onClick={() => handleDelete(news._id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </NewsCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsPage;
