import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/forms.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
    capacity: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !eventData.name.trim() ||
      !eventData.date ||
      !eventData.venue.trim() ||
      !eventData.capacity
    ) {
      alert("All fields are required.");
      return;
    }

    if (Number.parseInt(eventData.capacity) <= 0) {
      alert("Capacity must be greater than 0.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const authHeaders = getAuthHeaders();

      if (!authHeaders.Authorization) {
        alert("You must be logged in.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders
          },
          body: JSON.stringify({
            name: eventData.name.trim(),
            date: eventData.date,
            venue: eventData.venue.trim(),
            capacity: Number.parseInt(eventData.capacity)
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event Created Successfully!");

        setEventData({
          name: "",
          date: "",
          venue: "",
          capacity: ""
        });

        navigate("/admin/events");
      } else {
        setError(
          data.message ||
            "Failed to create event"
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard">

      <AdminSidebar />

      <main className="content">

        <div className="form-container">

          <div className="form-card">

            <h1>Create Event</h1>

            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "15px"
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={eventData.name}
                onChange={handleChange}
              />

              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />

              <input
                type="text"
                name="venue"
                placeholder="Venue"
                value={eventData.venue}
                onChange={handleChange}
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={eventData.capacity}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Create Event"}
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CreateEvent;