import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/events" element={<Events />} />
        <Route
          path="/admin/events/:id/registrations"
          element={<Registrations />}
        />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route
          path="/student/events"
          element={<AvailableEvents />}
        />
        <Route
          path="/student/registrations"
          element={<MyRegistrations />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;