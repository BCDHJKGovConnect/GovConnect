import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [citizenId, setCitizenId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!citizenId || !password) {
      alert("Please enter Citizen ID and password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("citizenId", citizenId);

    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      {/* Header */}
      <header className="login-header">
        <div className="login-header-content">

          <div>
            <h2>Government Business Portal</h2>
            <p>Digital Government Services</p>
          </div>

          <div className="header-status">
            Secure Citizen Portal
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="login-main">

        <div className="login-card">

          <div className="login-icon">
            👤
          </div>

          <h1>Citizen Login</h1>

          <p className="login-subtitle">
            Sign in to access government business services
          </p>

          <form onSubmit={handleLogin}>

            {/* Citizen ID */}
            <div className="form-group">
              <label htmlFor="citizenId">
                Citizen ID
              </label>

              <input
                id="citizenId"
                type="text"
                placeholder="Enter your Citizen ID"
                value={citizenId}
                onChange={(e) => setCitizenId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>

          <div className="login-security">
            🔒 Your information is securely protected
          </div>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>

      </main>

      {/* Footer */}
      <footer className="login-footer">
        <p>© 2026 Government Business Portal</p>
      </footer>

    </div>
  );
}

export default Login;