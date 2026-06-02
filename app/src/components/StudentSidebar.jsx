import { Link } from "react-router-dom";

function StudentSidebar() {
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

        <Link to="/">
          Logout
        </Link>
      </nav>
    </aside>
  );
}

export default StudentSidebar;