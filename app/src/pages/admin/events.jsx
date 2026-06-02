import { Link } from "react-router-dom";
import "../../styles/tables.css";

function Events() {
  const events = [
    {
      id: 1,
      name: "Hackathon",
      date: "2026-06-15",
      venue: "Main Auditorium",
      capacity: 100,
      registered: 65,
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "2026-06-20",
      venue: "Seminar Hall",
      capacity: 50,
      registered: 20,
    },
  ];

  return (
    <div className="table-container">
      <h1>All Events</h1>

      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Capacity</th>
            <th>Registered</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.venue}</td>
              <td>{event.capacity}</td>
              <td>{event.registered}</td>

              <td>
                <Link
                  to={`/admin/events/${event.id}/registrations`}
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
  );
}

export default Events;