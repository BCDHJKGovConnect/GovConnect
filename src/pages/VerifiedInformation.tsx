import { Link } from "react-router-dom";

function VerifiedInformation() {
  return (
    <div className="form-page">

      <header className="inner-header">

        <div className="inner-header-content">

          <div className="logo-box">

            <div className="mini-government-icon">
              🏛️
            </div>

            <div>
              <h2>Government Business Portal</h2>
              <p>Digital Government Services</p>
            </div>

          </div>

        </div>

      </header>


      <main className="form-main">

        <div className="form-card verified-card">

          <div className="success-icon">
            ✓
          </div>

          <p className="portal-label">
            STEP 3 OF 3
          </p>

          <h1>
            Verified Information
          </h1>

          <p className="page-description">
            Information received from connected government
            platforms has been successfully verified.
          </p>


          {/* Identity */}
          <div className="verified-section">

            <div className="verified-section-header">

              <h3>
                Identity Information
              </h3>

              <span className="verified-badge">
                ✓ Verified
              </span>

            </div>

            <div className="verified-details">

              <div>
                <span>Name</span>
                <strong>Ananya Sharma</strong>
              </div>

              <div>
                <span>Citizen ID</span>
                <strong>CIT1001</strong>
              </div>

            </div>

          </div>


          {/* Address */}
          <div className="verified-section">

            <div className="verified-section-header">

              <h3>
                Address Information
              </h3>

              <span className="verified-badge">
                ✓ Verified
              </span>

            </div>

            <div className="verified-details">

              <div>
                <span>City</span>
                <strong>Bengaluru</strong>
              </div>

              <div>
                <span>District</span>
                <strong>Bengaluru Urban</strong>
              </div>

              <div>
                <span>Pincode</span>
                <strong>560001</strong>
              </div>

            </div>

          </div>


          {/* Sources */}
          <div className="source-box">

            <h3>
              Verification Sources
            </h3>

            <div className="source-list">

              <span>✓ Identity Platform</span>
              <span>✓ Address Platform</span>
              <span>✓ Business Registry</span>

            </div>

          </div>


          <div className="form-actions">

            <Link to="/apply/consent">
              <button className="cancel-button">
                Back
              </button>
            </Link>

            <Link to="/apply/application">
              <button className="primary-button large-button">
                Continue
              </button>
            </Link>

          </div>

        </div>

      </main>


      <footer className="inner-footer">
        <p>
          © 2026 Government Business Portal
        </p>
      </footer>

    </div>
  );
}

export default VerifiedInformation;