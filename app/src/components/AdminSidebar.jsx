import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
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
  );
}

export default AdminSidebar;