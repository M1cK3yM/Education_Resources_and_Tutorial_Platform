import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import Pages from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pages.HomePage />} />
        <Route path="/universities" element={<Pages.UniversityPage />} />
        <Route path="/events" element={<Pages.EventsPage />} />
        <Route path="/resources" element={<Pages.ResourcePage />} />
        <Route path="/profile" element={<Pages.UserProfilePage />} />
        <Route path="/about" element={<Pages.AboutPage />} />
        <Route path="/news" element={<Pages.NewsPage />} />
        <Route path="/verify" element={<Pages.VerifyPage />} />
      </Routes>
    </>
  );
}

export default App;
