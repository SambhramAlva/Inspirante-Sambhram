import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  return (
    <div className="dashboard">
<AdminSidebar />
          

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

        

      </main>
    </div>
  );
}

export default AdminDashboard;