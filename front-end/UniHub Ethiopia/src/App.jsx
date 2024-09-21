import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pages from "./pages";
import { useState } from "react";
import { Loader } from "rsuite";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminPages from "./pages/admin";

function App() {
  const { isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("search term", searchTerm);
    navigate(`/search/${searchTerm}`);
  };

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {isLoading ? (
          <Loader size="lg" center />
        ) : (
          <Routes>
            <Route path="/" element={<Pages.HomePage />} />
            <Route path="/universities" element={<Pages.UniversityPage />} />
            <Route path="/events" element={<Pages.EventsPage />} />
            <Route
              path="events/:eventId"
              element={<Pages.EventDetailsPage />}
            />
            <Route path="/archived-events" element={<Pages.ArchivedPage />} />
            <Route
              path="/archived-events/:eventId"
              element={<Pages.EventDetailsPage isArchived={true} />}
            />
            <Route path="/event/rsvp/:eventId" element={<Pages.RsvpForm />} />
            <Route path="/resources" element={<Pages.ResourcePage />} />
            <Route
              path="/resources/:resourceId"
              element={<Pages.ResourceDetailsPage />}
            />
            <Route path="/about" element={<Pages.AboutPage />} />
            <Route path="/news" element={<Pages.NewsPage />} />
            <Route path="/news/:newsId" element={<Pages.NewsDetailPage />} />
            <Route path="/verify/:token?" element={<Pages.VerifyPage />} />
            <Route
              path="/forgot-password"
              element={<Pages.ForgetPasswordPage />}
            />
            <Route
              path="/reset-password/:token"
              element={<Pages.ResetPassword />}
            />
            <Route path="/user/:userId" element={<Pages.UserProfile />} />
            <Route path="/setting" element={<Pages.Setting />} />
            <Route
              path="/search/:searchTerm"
              element={<Pages.SearchResultPage />}
            />
            <Route path="*" element={<Pages.NotFoundPage />} />

            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route
              path="/admin/events"
              element={<AdminPages.AdminEventsPage />}
            />
          </Routes>
        )}
      </main>

      {!isAdminRoute && (
        <>
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
