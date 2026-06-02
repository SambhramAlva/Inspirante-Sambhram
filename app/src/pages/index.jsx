import "./index.css";

function App() {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>

        <form>
          <input
            type="email"
            placeholder="Enter Email"
            className="input-field"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default App;