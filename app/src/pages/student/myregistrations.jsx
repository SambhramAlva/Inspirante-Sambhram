import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/tables.css";

function MyRegistrations() {

  const [registrations, setRegistrations] =
    useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {

    try {

      const studentId =
        localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:5000/api/registrations/student/${studentId}`
      );

      const data = await response.json();

      setRegistrations(data);

    } catch (error) {

      console.error(error);

    }
  };

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

              <tr key={item._id}>

                <td>
                  {item.eventId?.name}
                </td>

                <td>
                  {item.eventId?.date
                    ? new Date(
                        item.eventId.date
                      ).toLocaleDateString()
                    : ""}
                </td>

                <td>
                  {item.eventId?.venue}
                </td>

                <td>
                  Registered
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </main>

    </div>
  );
}

export default MyRegistrations;