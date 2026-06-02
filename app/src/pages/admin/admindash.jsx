import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <Link to="/admin">Dashboard</Link>

          <Link to="/admin/create-event">
            Create Event
          </Link>

          <Link to="/admin/events">
            View Events
          </Link>

          <Link to="/">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">

        <h1>Welcome Admin</h1>

        <div className="cards">

          <div className="card">
            <h3>Total Events</h3>
            <p>0</p>
          </div>

          <div className="card">
            <h3>Total Registrations</h3>
            <p>0</p>
          </div>

          <div className="card">
            <h3>Upcoming Events</h3>
            <p>0</p>
          </div>

        </div>

        <div className="actions">

          <h2>Quick Actions</h2>

          <Link to="/admin/create-event">
            <button>Create New Event</button>
          </Link>

          <Link to="/admin/events">
            <button>Manage Events</button>
          </Link>

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;