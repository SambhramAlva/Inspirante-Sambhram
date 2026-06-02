import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import StudentSidebar from "../../components/StudentSidebar";

function StudentDashboard() {
  return (
    <div className="dashboard">
         <StudentSidebar />
      

      {/* Main Content */}
      <main className="content">

        <h1>Welcome Student</h1>

        <div className="cards">

          <div className="card">
            <h3>Available Events</h3>
            <p>0</p>
          </div>

          <div className="card">
            <h3>My Registrations</h3>
            <p>0</p>
          </div>

        </div>

        

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h2>Upcoming Events</h2>

          <p style={{ marginTop: "10px" }}>
            No upcoming events available.
          </p>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;