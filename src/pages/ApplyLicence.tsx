import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ApplyLicence() {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleContinue = () => {

    if (!businessName || !businessType || !address) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "businessName",
      businessName
    );

    localStorage.setItem(
      "businessType",
      businessType
    );

    localStorage.setItem(
      "businessAddress",
      address
    );

    navigate("/apply/consent");
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

          <Link to="/dashboard">
            <button className="header-back-button">
              Dashboard
            </button>
          </Link>

        </div>

      </header>


      <main className="form-main">

        <div className="form-card">

          <p className="portal-label">
            BUSINESS SERVICES
          </p>

          <h1>
            Apply for Business Licence
          </h1>

          <p className="page-description">
            Enter your basic business information to begin
            your licence application.
          </p>


          <div className="step-indicator">

            <div className="step active">
              <span>1</span>
              Business Details
            </div>

            <div className="step-line"></div>

            <div className="step">
              <span>2</span>
              Consent
            </div>

            <div className="step-line"></div>

            <div className="step">
              <span>3</span>
              Verification
            </div>

          </div>


          <div className="form-group">

            <label>
              Business Name
            </label>

            <input
              type="text"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) =>
                setBusinessName(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Business Type
            </label>

            <select
              value={businessType}
              onChange={(e) =>
                setBusinessType(e.target.value)
              }
            >

              <option value="">
                Select Business Type
              </option>

              <option value="Retail">
                Retail
              </option>

              <option value="Restaurant">
                Restaurant
              </option>

              <option value="Manufacturing">
                Manufacturing
              </option>

              <option value="Services">
                Services
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>
              Business Address
            </label>

            <textarea
              placeholder="Enter complete business address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

          </div>


          <div className="form-actions">

            <Link to="/dashboard">
              <button className="cancel-button">
                Cancel
              </button>
            </Link>

            <button
              className="primary-button large-button"
              onClick={handleContinue}
            >
              Continue
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

export default ApplyLicence;