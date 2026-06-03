import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function AvailableEvents() {
  const [events, setEvents] = useState([]);
  const [registrationCounts, setRegistrationCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch("http://localhost:3000/api/events"),
        fetch("http://localhost:3000/api/registrations")
      ]);

      if (!eventsRes.ok) {
        throw new Error("Failed to load events");
      }

      const eventsData = await eventsRes.json();
      const sortedEvents = eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);

      if (registrationsRes.ok) {
        const registrationsData = await registrationsRes.json();
        const counts = registrationsData.reduce((acc, registration) => {
          const eventId = registration.eventId?._id || registration.eventId;
          if (!eventId) return acc;
          const key = eventId.toString();
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
        setRegistrationCounts(counts);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load events");
    } finally {
      setLoading(false);
    }
  };

  const isFull = (event) => {
    const registeredCount = registrationCounts[event._id] || 0;
    return registeredCount >= event.capacity;
  };

  const handleRegister = async (eventId) => {
    try {
      const studentId = localStorage.getItem("userId");
      const authHeaders = getAuthHeaders();

      if (!studentId || !authHeaders.Authorization) {
        setError("You must be logged in to register.");
        return;
      }

      const studentRegistrationsRes = await fetch(
        `http://localhost:3000/api/registrations/student/${studentId}`,
        {
          headers: {
            ...authHeaders
          }
        }
      );

      if (!studentRegistrationsRes.ok) {
        if (studentRegistrationsRes.status === 401) {
          throw new Error("Authentication required");
        }
        throw new Error("Failed to verify registrations");
      }

      const studentRegistrations = await studentRegistrationsRes.json();
      const alreadyRegistered = studentRegistrations.some(
        (reg) => (reg.eventId?._id || reg.eventId) === eventId
      );

      if (alreadyRegistered) {
        setError("Already Registered");
        return;
      }

      const response = await fetch("http://localhost:3000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders
        },
        body: JSON.stringify({
          eventId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message === "Event full") {
          setError("Event Full");
          return;
        }
        if (response.status === 400 && data.message === "Already registered for this event") {
          setError("Already Registered");
          return;
        }
        setError(data.message || "Registration failed");
        return;
      }

      await fetchEvents();
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="dashboard">
      <StudentSidebar />

      <main className="content">
        <h1>Available Events</h1>

        {error && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {loading && <p>Loading events...</p>}

        {!loading && events.length === 0 && <p>No events available at this time.</p>}

        {!loading && events.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.venue}</td>
                  <td>{event.capacity}</td>
                  <td>
                    {isFull(event) ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Full
                      </span>
                    ) : (
                      <span style={{ color: "green" }}>Available</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleRegister(event._id)}
                      disabled={isFull(event)}
                    >
                      {isFull(event) ? "Full" : "Register"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default AvailableEvents;