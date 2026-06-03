import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tables.css";
import AdminSidebar from "../../components/AdminSidebar";

function Registrations() {

  const { id } = useParams();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setError("");
      setLoading(true);
      const authHeaders = getAuthHeaders();

      if (!authHeaders.Authorization) {
        alert("Authentication required to view event registrations.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/registrations/event/${id}`,
        {
          headers: {
            ...authHeaders
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load registrations");
        return;
      }

      setRegistrations(data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      <AdminSidebar />

      <main className="content">

        <div className="table-container">

          <h1>Event Registrations</h1>

          {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

          {loading ? (
            <p>Loading registrations...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Registered On</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((item) => (
                  <tr key={item._id}>
                    <td>{item.studentId?.username}</td>
                    <td>{new Date(item.registeredAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>

    </div>
  );
}

export default Registrations;