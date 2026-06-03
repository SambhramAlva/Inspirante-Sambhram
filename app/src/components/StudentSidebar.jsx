import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    navigate("/");
  };
  return (
    <aside className="sidebar">
      <h2>Student Panel</h2>

      <nav>
        <Link to="/student">Dashboard</Link>

        <Link to="/student/events">
          Browse Events
        </Link>

        <Link to="/student/registrations">
          My Registrations
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

export default StudentSidebar;