import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function AvailableEvents() {
  const events = [
    {
      id: 1,
      name: "Tech Symposium 2026",
      date: "2026-07-10",
      venue: "Main Auditorium",
      capacity: 120,
      registered: 85,
    },
    {
      id: 2,
      name: "Hackathon",
      date: "2026-07-15",
      venue: "Lab Block C",
      capacity: 40,
      registered: 40,
    },
    {
      id: 3,
      name: "Cultural Fest",
      date: "2026-07-20",
      venue: "Open Amphitheatre",
      capacity: 300,
      registered: 210,
    },
    {
      id: 4,
      name: "Workshop: React Basics",
      date: "2026-07-22",
      venue: "Seminar Hall 2",
      capacity: 30,
      registered: 18,
    },
    {
      id: 5,
      name: "Placement Prep Talk",
      date: "2026-07-25",
      venue: "Main Auditorium",
      capacity: 200,
      registered: 140,
    },
  ];

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
                  {event.registered < event.capacity ? (
                    <button className="action-btn">
                      Register
                    </button>
                  ) : (
                    <button
                      className="action-btn"
                      disabled
                    >
                      Full
                    </button>
                  )}
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