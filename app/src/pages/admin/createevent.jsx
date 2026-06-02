import { useState } from "react";
import "../../styles/forms.css";
import AdminSidebar from "../../components/AdminSidebar";

function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
    capacity: ""
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event Created Successfully!");

        console.log(data);

        setEventData({
          name: "",
          date: "",
          venue: "",
          capacity: ""
        });
      } else {
        alert(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar />

      <main className="content">
        <div className="form-container">
          <div className="form-card">

            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>

              <label>Event Name</label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />

              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
                required
              />

              <label>Maximum Capacity</label>
              <input
                type="number"
                name="capacity"
                value={eventData.capacity}
                onChange={handleChange}
                placeholder="Enter capacity"
                required
              />

              <button type="submit">
                Create Event
              </button>

            </form>

          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateEvent;