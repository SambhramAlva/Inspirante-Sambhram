import "../../styles/tables.css";

function Registrations() {
  const registrations = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      date: "2026-06-01",
    },
    {
      id: 2,
      name: "Ananya",
      email: "ananya@gmail.com",
      date: "2026-06-02",
    },
    {
      id: 3,
      name: "Kiran",
      email: "kiran@gmail.com",
      date: "2026-06-03",
    },
  ];

  return (
    <div className="table-container">
      <h1>Event Registrations</h1>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Registration Date</th>
          </tr>
        </thead>

        <tbody>
          {registrations.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Registrations;