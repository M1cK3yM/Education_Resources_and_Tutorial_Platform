import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pages from "./pages";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Navbar />
          <Routes>
            <Route path="/" element={<Pages.HomePage />} />
            <Route path="/universities" element={<Pages.UniversityPage />} />
            <Route path="/events" element={<Pages.EventsPage />} />
            <Route
              path="events/:eventId"
              element={<Pages.EventDetailsPage />}
            />
            <Route path="/resources" element={<Pages.ResourcePage />} />
            <Route path="/profile" element={<Pages.UserProfilePage />} />
            <Route path="/about" element={<Pages.AboutPage />} />
            <Route path="/news" element={<Pages.NewsPage />} />
            <Route path="/verify" element={<Pages.VerifyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
