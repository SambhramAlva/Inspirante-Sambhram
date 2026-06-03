import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute
from "./components/ProtectedRoute";
// Common Login
import Login from "./pages/login";

// Admin Pages
import AdminDashboard from "./pages/admin/admindash";
import CreateEvent from "./pages/admin/createevent";
import Events from "./pages/admin/events";
import Registrations from "./pages/admin/registrations";

// Student Pages
import StudentDashboard from "./pages/student/studentdash";
import AvailableEvents from "./pages/student/availableevents";
import MyRegistrations from "./pages/student/myregistrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/create-event" element={<ProtectedRoute
      allowedRole="admin"
    ><CreateEvent /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute
      allowedRole="admin"
    ><Events /></ProtectedRoute>} />
        <Route
          path="/admin/events/:id/registrations"
          element={<ProtectedRoute
      allowedRole="admin"
    ><Registrations /></ProtectedRoute>}
        />

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute
      allowedRole="student"
    >
      <StudentDashboard />
    </ProtectedRoute>} />
        <Route
          path="/student/events"
          element={<ProtectedRoute
      allowedRole="student"
    ><AvailableEvents /></ProtectedRoute>}
        />
        <Route
          path="/student/registrations"
          element={<ProtectedRoute
      allowedRole="student"
    ><MyRegistrations /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;