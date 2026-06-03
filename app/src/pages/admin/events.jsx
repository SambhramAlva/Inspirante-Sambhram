import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tables.css";
import AdminSidebar from "../../components/AdminSidebar";

function Events() {

  const [events, setEvents] = useState([]);
  const [registrationCounts, setRegistrationCounts] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch("http://localhost:3000/api/events"),
        fetch("http://localhost:3000/api/registrations")
      ]);

      const [eventsData, registrationsData] = await Promise.all([
        eventsRes.json(),
        registrationsRes.json()
      ]);

      setEvents(eventsData);

      const counts = registrationsData.reduce((acc, registration) => {
        const eventId = registration.eventId?._id || registration.eventId;
        if (!eventId) return acc;
        const key = eventId.toString();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      setRegistrationCounts(counts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">

      <AdminSidebar />

      <main className="content">

        <div className="table-container">

          <h1>All Events</h1>

          <table>

            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Registrations</th>
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

                  <td>{registrationCounts[event._id] || 0}</td>

                  <td>{event.capacity}</td>

                  <td>
                    <Link
                      to={`/admin/events/${event._id}/registrations`}
                    >
                      <button className="action-btn">
                        View Registrations
                      </button>
                    </Link>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Events;