import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function AvailableEvents() {

  const [events, setEvents] = useState([]);
  const [registrationCounts, setRegistrationCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch("http://localhost:3000/api/events"),
        fetch("http://localhost:3000/api/registrations")
      ]);

      if (!eventsRes.ok) {
        throw new Error(`Events fetch failed: ${eventsRes.status}`);
      }

      const eventsData = await eventsRes.json();
      
      const sortedEvents = eventsData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      
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
      setError(err.message);
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

      const studentId =
        localStorage.getItem("userId");

      if (!studentId) {
        alert("Please log in first");
        return;
      }

      const studentRegistrationsRes = await fetch(
        `http://localhost:3000/api/registrations/student/${studentId}`
      );

      if (!studentRegistrationsRes.ok) {
        throw new Error("Could not check your registrations");
      }

      const studentRegistrations = await studentRegistrationsRes.json();

      const alreadyRegistered = studentRegistrations.some(
        (reg) => (reg.eventId?._id || reg.eventId) === eventId
      );

      if (alreadyRegistered) {
        alert("You are already registered for this event!");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/registrations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            studentId,
            eventId,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        alert(
          "Registered Successfully!"
        );

        fetchEvents();

      } else {

        alert(data.message || "Failed to register");

      }

    } catch (error) {

      console.error(error);
      alert("Error: " + error.message);

    }
  };

  return (
    <div className="dashboard">

      <StudentSidebar />

      <main className="content">

        <h1>Available Events</h1>

        {error && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            Error: {error}
          </div>
        )}

        {loading && <p>Loading events...</p>}

        {!loading && events.length === 0 && (
          <p>No events available at this time.</p>
        )}

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

                  <td>
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </td>

                  <td>{event.venue}</td>

                  <td>{event.capacity}</td>

                  <td>
                    {isFull(event) ? (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold"
                        }}
                      >
                        Full
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "green"
                        }}
                      >
                        Available
                      </span>
                    )}
                  </td>

                  <td>

                    <button
                      className="action-btn"
                      onClick={() =>
                        handleRegister(
                          event._id
                        )
                      }
                      disabled={isFull(event)}
                    >
                      {isFull(event)
                        ? "Full"
                        : "Register"}
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