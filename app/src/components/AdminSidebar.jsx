import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    navigate("/");
  };
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

          <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
        </nav>
      </aside>
  );
}

export default AdminSidebar;