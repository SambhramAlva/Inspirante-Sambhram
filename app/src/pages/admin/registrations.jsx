import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tables.css";
import AdminSidebar from "../../components/AdminSidebar";

function Registrations() {

  const { id } = useParams();

  const [registrations, setRegistrations] =
    useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {

      const response = await fetch(
        `http://localhost:3000/api/registrations/event/${id}`
      );

      const data = await response.json();

      setRegistrations(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">

      <AdminSidebar />

      <main className="content">

        <div className="table-container">

          <h1>Event Registrations</h1>

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

                  <td>
                    {item.studentId?.username}
                  </td>

                  

                  <td>
                    {new Date(
                      item.registeredAt
                    ).toLocaleDateString()}
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

export default Registrations;