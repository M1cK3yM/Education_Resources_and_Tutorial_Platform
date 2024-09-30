import Pages from "./pages";
import Sidebar from "./components/sideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Pages.AdminDashboard />} />
          <Route path="/admin/home" element={<Pages.AdminDashboard />} />
          <Route path="/*" element={<Pages.NotFoundPage />} />
          <Route path="/admin/events" element={<Pages.AdminEventsPage />} />
          <Route path="/admin/news" element={<Pages.AdminNewsPage />} />
          <Route
            path="/admin/universities"
            element={<Pages.AdminUniversityPage />}
          />
          <Route
            path="/admin/resources"
            element={<Pages.AdminResourcePage />}
          />
          <Route path="/admin/event-rsvp" element={<Pages.EventRsvp />} />
          <Route
            path="/admin/event-rsvp/:eventId/responses"
            element={<Pages.EventRsvpResponses />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
