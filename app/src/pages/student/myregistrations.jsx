import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchRegistrations = async () => {
    try {
      setError("");
      setLoading(true);

      const studentId = localStorage.getItem("userId");
      const authHeaders = getAuthHeaders();

      if (!studentId || !authHeaders.Authorization) {
        setError("You must be logged in to see your registrations.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/registrations/student/${studentId}`,
        {
          headers: {
            ...authHeaders
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load registrations");
        return;
      }

      setRegistrations(data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      <StudentSidebar />

      <main className="content">

        <h1>My Registrations</h1>

        {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

        {loading ? (
          <p>Loading registrations...</p>
        ) : (
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
                <tr key={item._id}>
                  <td>{item.eventId?.name}</td>
                  <td>
                    {item.eventId?.date
                      ? new Date(item.eventId.date).toLocaleDateString()
                      : ""}
                  </td>
                  <td>{item.eventId?.venue}</td>
                  <td>Registered</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </main>

    </div>
  );
}

export default MyRegistrations;