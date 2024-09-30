import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pages from "./pages";
import { useState } from "react";
import { Loader } from "rsuite";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("search term", searchTerm);
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        {isLoading ? (
          <Loader size="lg" center />
        ) : (
          <Routes>
            <Route path="/redirect" element={
              <Pages.RedirectPage />
            } />
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
          </Routes>
        )}
      </main>
      <Footer />
    </div >
  );
}

export default App;
