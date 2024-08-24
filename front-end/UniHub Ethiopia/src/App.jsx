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
        <Route path="/verify/:token?" element={<Pages.VerifyPage />} />
        <Route path="/forgot-password" element={<Pages.ForgetPasswordPage />} />
        <Route path="*" element={<Pages.NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
