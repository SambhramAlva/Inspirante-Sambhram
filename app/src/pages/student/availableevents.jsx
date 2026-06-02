import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function AvailableEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      setEvents(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (eventId) => {

    try {

      const studentId =
        localStorage.getItem("userId");

      const response = await fetch(
        "http://localhost:5000/api/registrations",
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

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="dashboard">

      <StudentSidebar />

      <main className="content">

        <h1>Available Events</h1>

        <table>

          <thead>

            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Capacity</th>
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

                  <button
                    className="action-btn"
                    onClick={() =>
                      handleRegister(
                        event._id
                      )
                    }
                  >
                    Register
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </main>

    </div>
  );
}

export default AvailableEvents;