import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardTotals = async () => {
      try {
        const [eventsRes, registrationsRes] = await Promise.all([
          fetch("http://localhost:3000/api/events"),
          fetch("http://localhost:3000/api/registrations")
        ]);

        if (!eventsRes.ok || !registrationsRes.ok) {
          throw new Error("Unable to load dashboard data");
        }

        const [events, registrations] = await Promise.all([
          eventsRes.json(),
          registrationsRes.json()
        ]);

        setTotalEvents(events.length);
        setTotalRegistrations(registrations.length);

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

    fetchDashboardTotals();
  }, []);

  return (
    <div className="dashboard">
      <AdminSidebar />

      {/* Main Content */}
      <main className="content">
        <h1>Welcome Admin</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Events</h3>
            <p>{loading ? "Loading..." : totalEvents}</p>
          </div>

          <div className="card">
            <h3>Total Registrations</h3>
            <p>{loading ? "Loading..." : totalRegistrations}</p>
          </div>

          <div className="card">
            <h3>Upcoming Events</h3>
            <p>{loading ? "Loading..." : upcomingEvents}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;