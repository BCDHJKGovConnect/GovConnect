import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Consent() {
  const [consent, setConsent] = useState(false);

  const navigate = useNavigate();

  const handleConsent = () => {

    if (!consent) {
      alert("Please provide consent to continue");
      return;
    }

    localStorage.setItem(
      "consentGiven",
      "true"
    );

    navigate("/apply/verified-information");
  };

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

          <Link to="/apply">
            <button className="header-back-button">
              Back
            </button>
          </Link>

        </div>

      </header>


      <main className="form-main">

        <div className="form-card consent-card">

          <div className="page-icon">
            🔐
          </div>

          <p className="portal-label">
            STEP 2 OF 3
          </p>

          <h1>
            Consent Required
          </h1>

          <p className="page-description">
            Your consent is required before information
            can be verified through connected government platforms.
          </p>


          <div className="information-box">

            <h3>
              Information that may be verified
            </h3>

            <div className="verification-item">
              <span>✓</span>
              <p>Identity Information</p>
            </div>

            <div className="verification-item">
              <span>✓</span>
              <p>Address Information</p>
            </div>

            <div className="verification-item">
              <span>✓</span>
              <p>Business Information</p>
            </div>

          </div>


          <label className="consent-checkbox">

            <input
              type="checkbox"
              checked={consent}
              onChange={(e) =>
                setConsent(e.target.checked)
              }
            />

            <span>
              I give consent to verify my information
              from connected government platforms.
            </span>

          </label>


          <div className="form-actions">

            <Link to="/apply">
              <button className="cancel-button">
                Back
              </button>
            </Link>

            <button
              className="primary-button large-button"
              onClick={handleConsent}
            >
              Give Consent
            </button>

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

export default Consent;