import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const citizenId = localStorage.getItem("citizenId") || "CIT1001";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("citizenId");
    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">

          <div>
            <h2>Government Business Portal</h2>
            <p>Digital Government Services</p>
          </div>

          <div className="dashboard-user">
            <span>Citizen ID: {citizenId}</span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </header>


      {/* Main Content */}
      <main className="dashboard-main">
      <section className="image-slider">
      <div className="slider-track">

      <img src="/public/banner1.jpeg" alt="Government Services" />

      <img
      src="/public/banner2.jpeg"
      alt="Digital Government Services"
      />

      <img
      src="/public/banner3.jpeg"
      alt="Citizen Services"
      />

    {/* Duplicate for continuous scrolling */}
      <img src="/public/banner1.jpeg" alt="Government Services" />

     <img
      src="/public/banner2.jpeg"
      alt="Digital Government Services"
      />

      <img
      src="/public/banner3.jpeg"
      alt="Citizen Services"
      />

      </div>
      </section>
        {/* Welcome */}
        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-label">
              CITIZEN DASHBOARD
            </p>

            <h1>Welcome, Ananya 👋</h1>

            <p>
              Access government business services and manage
              your applications from one place.
            </p>
          </div>

        </section>


        {/* Services */}
        <section className="dashboard-section">

          <h2>Government Services</h2>

          <div className="service-grid">

            {/* Business Licence */}
            <div className="service-card">

              <div className="service-icon">
                🏢
              </div>

              <h3>Business Licence</h3>

              <p>
                Apply for a new business licence
                through the online government service.
              </p>

              <Link to="/apply">
                <button className="primary-button">
                  Apply Now
                </button>
              </Link>

            </div>


            {/* Application Tracker */}
            <div className="service-card">

              <div className="service-icon">
                📋
              </div>

              <h3>Track Application</h3>

              <p>
                Check the current status of your
                submitted business licence application.
              </p>

              <Link to="/application/BL-1001">
                <button className="secondary-button">
                  Track Application
                </button>
              </Link>

            </div>

          </div>

        </section>


        {/* My Applications */}
        <section className="dashboard-section">

          <div className="section-heading">

            <h2>My Applications</h2>

            <span className="application-count">
              1 Application
            </span>

          </div>


          <div className="application-card">

            <div className="application-info">

              <div className="application-id">
                BL-1001
              </div>

              <h3>ABC Traders</h3>

              <p>
                Business Licence Application
              </p>

            </div>


            <div className="application-status">

              <span className="status-dot"></span>

              <div>
                <strong>Under Verification</strong>

                <p>
                  Your information is being verified
                </p>
              </div>

            </div>


            <Link to="/application/BL-1001">
              <button className="view-button">
                View Application
              </button>
            </Link>

          </div>

        </section>


        {/* Information */}
        <section className="dashboard-info">

          <div>
            <span>🔒</span>

            <div>
              <h3>Secure Government Platform</h3>

              <p>
                Your information is protected and exchanged
                securely between connected government platforms.
              </p>
            </div>
          </div>

        </section>

      </main>


      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          © 2026 Government Business Portal
        </p>
      </footer>

    </div>
  );
}

export default Dashboard;