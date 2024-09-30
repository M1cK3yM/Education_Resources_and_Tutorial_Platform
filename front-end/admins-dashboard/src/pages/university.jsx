import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventCardAdmin";
import { universitiesApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import UniversityForm from "../components/universityForm";

const menuItems = [
  { name: "Home", icon: "🏠" },
  { name: "Universities", icon: "🏛️" },
  { name: "Resources", icon: "📚" },
  { name: "Events", icon: "🎉" },
  { name: "News", icon: "📰" },
  { name: "Users", icon: "👥" },
  { name: "Event RSVP", icon: "📝" },
];

const AdminUniversityPage = () => {
  const [university, setUniversity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentUnversity, setCurrentUniversity] = useState(null); // For updating an event

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!error) {
      fetchUniversity(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchUniversity = async (currentPage) => {
    try {
      await requestHandler(
        () => universitiesApi.getAllUniversities(currentPage),
        setLoading,
        (data) => {
          setUniversity(data.universities);
          console.log(data);
          setTotalPages(data.pages);
        },
        (error) => setError(error)
      );
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  const handleDelete = async (universityId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university?"
    );
    if (confirmDelete) {
      try {
        await universitiesApi.deleteUniversity(universityId);
        fetchUniversity(currentPage); // Refresh university after deletion
      } catch (error) {
        console.error("Error deleting university:", error);
        setError(error);
      }
    }
  };

  const handleUpdate = (university) => {
    setCurrentUniversity(university);
    setShowForm(true); // Show the form for updating the university
  };

  const handleCreate = () => {
    setCurrentUniversity(null); // Clear current university for new creation
    setShowForm(true); // Show the form for creating a new university
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentUnversity) {
        await universitiesApi.updateUniversity(currentUnversity._id, formData); // Update university
      } else {
        await universitiesApi.createUniversity(formData); // Create university
      }
      setShowForm(false);
      fetchUniversity(currentPage); // Refresh university after creating/updating
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
        <h1 className="text-2xl font-bold mb-4">Manage university</h1>
        <Button onClick={handleCreate} className="mb-4">
          Add university
        </Button>

        {showForm && (
          <UniversityForm
            university={currentUnversity}
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching university: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {university.map((university) => (
              <EventCard
                key={university._id}
                title={university.title}
                date={university.date}
                note={university.note}
                description={university.description}
                imageUrl={university.coverImage}
              >
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleUpdate(university)}>
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(university._id)}
                    className="bg-red-500 border"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </EventCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUniversityPage;
