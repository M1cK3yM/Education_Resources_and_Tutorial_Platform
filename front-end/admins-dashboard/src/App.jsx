import Pages from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Pages.AdminDashboard />} />
          <Route path="/admin/*" element={<Pages.AdminDashboard />} />
          <Route path="/admin/home" element={<Pages.AdminDashboard />} />
          <Route path="/admin/events" element={<Pages.AdminEventsPage />} />
          <Route path="/admin/news" element={<Pages.AdminNewsPage />} />
          <Route path="/admin/event-rsvp" element={<Pages.EventRsvp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
