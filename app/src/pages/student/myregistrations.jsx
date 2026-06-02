import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function MyRegistrations() {
  const registrations = [
    {
      id: 1,
      event: "Tech Symposium 2026",
      date: "2026-07-10",
      venue: "Main Auditorium",
      status: "Registered",
    },
    {
      id: 2,
      event: "Workshop: React Basics",
      date: "2026-07-22",
      venue: "Seminar Hall 2",
      status: "Registered",
    },
  ];

  return (
    <div className="dashboard">
      <StudentSidebar />

      <main className="content">
        <h1>My Registrations</h1>

        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((item) => (
              <tr key={item.id}>
                <td>{item.event}</td>
                <td>{item.date}</td>
                <td>{item.venue}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default MyRegistrations;