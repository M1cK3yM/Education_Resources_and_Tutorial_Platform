import Pages from "./pages";
import Sidebar from "./components/sideBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated())

  return isAuthenticated ? children : <Navigate to="/login" replace />
}
function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Pages.AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/home" element={
          <ProtectedRoute>
            <Pages.AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/*" element={
          <Pages.NotFoundPage />
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <Pages.AdminEventsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute>
            <Pages.AdminNewsPage />
          </ProtectedRoute>
        } />
        <Route
          path="/admin/universities"
          element={
            <ProtectedRoute>
              <Pages.AdminUniversityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/resources"
          element={
            <ProtectedRoute>
              <Pages.AdminResourcePage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/event-rsvp" element={
          <ProtectedRoute>
            <Pages.EventRsvp />
          </ProtectedRoute>
        } />
        <Route
          path="/admin/event-rsvp/:eventId/responses"
          element={
            <ProtectedRoute>
              <Pages.EventRsvpResponses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div >
  );
}

export default App;
