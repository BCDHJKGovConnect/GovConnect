import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Application() {
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const businessName =
    localStorage.getItem("businessName") || "ABC Traders";

  const businessType =
    localStorage.getItem("businessType") || "Retail";

  const handleSubmit = () => {
    if (!description || !employees || !confirmed) {
      alert("Please complete all required fields");
      return;
    }

    localStorage.setItem("applicationSubmitted", "true");

    alert("Application submitted successfully!");

    navigate("/application/BL-1001");
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
        </div>
      </header>

      <main className="form-main">
        <div className="form-card application-form-card">

          <p className="portal-label">
            FINAL APPLICATION
          </p>

          <h1>
            Business Licence Application
          </h1>

          <p className="page-description">
            Review your verified information and provide
            the remaining details to submit your application.
          </p>

          <div className="review-box">
            <h3>
              Applicant
            </h3>

            <div className="review-row">
              <span>Name</span>
              <strong>
                Ananya Sharma ✓
              </strong>
            </div>

            <div className="review-row">
              <span>Citizen ID</span>
              <strong>
                CIT1001
              </strong>
            </div>
          </div>

          <div className="review-box">
            <h3>
              Business Information
            </h3>

            <div className="review-row">
              <span>Business Name</span>
              <strong>
                {businessName}
              </strong>
            </div>

            <div className="review-row">
              <span>Business Type</span>
              <strong>
                {businessType}
              </strong>
            </div>
          </div>

          <div className="form-group">
            <label>
              Business Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe your business"
            />
          </div>

          <div className="form-group">
            <label>
              Expected Employees
            </label>

            <input
              type="number"
              min="1"
              value={employees}
              onChange={(e) =>
                setEmployees(e.target.value)
              }
              placeholder="Number of employees"
            />
          </div>

          <label className="consent-checkbox">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) =>
                setConfirmed(e.target.checked)
              }
            />

            <span>
              I confirm that the information provided
              is correct and complete.
            </span>
          </label>

          <div className="form-actions">

            <Link to="/apply/verified-information">
              <button className="cancel-button">
                Back
              </button>
            </Link>

            <button
              className="primary-button large-button"
              onClick={handleSubmit}
            >
              Submit Application
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

export default Application;