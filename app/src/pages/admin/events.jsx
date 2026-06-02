import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tables.css";
import AdminSidebar from "../../components/AdminSidebar";

function Events() {

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