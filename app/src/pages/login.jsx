import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  // State Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            className="input-field"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;