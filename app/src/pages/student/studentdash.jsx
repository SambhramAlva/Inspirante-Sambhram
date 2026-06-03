import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import StudentSidebar from "../../components/StudentSidebar";

function StudentDashboard() {
  const [availableEvents, setAvailableEvents] = useState(0);
  const [myRegistrations, setMyRegistrations] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const studentId = localStorage.getItem("userId");

        const eventsRequest = fetch("http://localhost:3000/api/events");
        const registrationsRequest = studentId
          ? fetch(`http://localhost:3000/api/registrations/student/${studentId}`)
          : Promise.resolve({ ok: true, json: async () => [] });

        const [eventsRes, registrationsRes] = await Promise.all([
          eventsRequest,
          registrationsRequest
        ]);

        if (!eventsRes.ok || !registrationsRes.ok) {
          throw new Error("Unable to load student dashboard data");
        }

        const [events, registrations] = await Promise.all([
          eventsRes.json(),
          registrationsRes.json()
        ]);

        setAvailableEvents(events.length);
        setMyRegistrations(registrations.length);

        const now = new Date();
        const upcomingCount = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate > now;
        }).length;

        setUpcomingEvents(upcomingCount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  let upcomingMessage = "Loading...";
  if (!loading) {
    if (upcomingEvents > 0) {
      upcomingMessage = `${upcomingEvents} upcoming event(s) available.`;
    } else {
      upcomingMessage = "No upcoming events available.";
    }
  }

  return (
    <div className="dashboard">
      <StudentSidebar />

      {/* Main Content */}
      <main className="content">

        <h1>Welcome Student</h1>

        <div className="cards">

          <div className="card">
            <h3>Available Events</h3>
            <p>{loading ? "Loading..." : availableEvents}</p>
          </div>

          <div className="card">
            <h3>My Registrations</h3>
            <p>{loading ? "Loading..." : myRegistrations}</p>
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
            {upcomingMessage}
          </p>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;