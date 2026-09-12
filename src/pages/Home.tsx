
import { Link } from "react-router-dom";
import "../App.css";
import governmentLogo from "../assets/governmentLogo.png";

function Home() {
  return (
    <div className="home-page">

      {/* Header */}

<header className="home-header">
  <div className="header-content">

    <div className="logo-box">

      <img
        src={governmentLogo}
        alt="Government Logo"
        className="government-logo"
      />

      <div>
        <h2>Government Business Portal</h2>
        <p>Digital Government Services</p>
      </div>

    </div>

    <div className="header-status">
      Secure Citizen Portal
    </div>

  </div>
</header>



      {/* Main Content */}
      <main className="home-main">

        <div className="welcome-card">

          <div className="welcome-icon">
            🏛️
          </div>

          <h1>Welcome</h1>

          <h2>Government Business Portal</h2>

          <p className="welcome-text">
            Access government business services through a
            secure, simple and convenient digital platform.
          </p>

          <div className="login-section">

            <p className="login-title">
              Citizen Services
            </p>

            <Link to="/login">
              <button className="citizen-login">
                Citizen Login
              </button>
            </Link>

            <p className="login-help">
              Login to apply for and track your government services.
            </p>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Government Business Portal</p>
      </footer>

    </div>
  );
}

export default Home;

