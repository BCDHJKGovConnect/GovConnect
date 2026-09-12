import { Link, useParams } from "react-router-dom";

function ApplicationTracker() {
  const { id } = useParams();

  return (
    <div className="tracker-page">

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


      <main className="tracker-main">

        <div className="tracker-card">

          <div className="tracker-top">

            <div>

              <p className="portal-label">
                APPLICATION TRACKER
              </p>

              <h1>
                Application {id}
              </h1>

              <p>
                Business Licence Application
              </p>

            </div>

            <div className="current-status">

              <span className="status-dot"></span>

              <div>
                <span>Current Status</span>
                <strong>Under Verification</strong>
              </div>

            </div>

          </div>


          <div className="tracker-business">

            <span>
              Business
            </span>

            <strong>
              ABC Traders
            </strong>

          </div>


          {/* Timeline */}
          <div className="timeline">

            <div className="timeline-item completed">

              <div className="timeline-icon">
                ✓
              </div>

              <div>
                <h3>
                  Application Submitted
                </h3>

                <p>
                  Your application has been successfully submitted.
                </p>
              </div>

            </div>


            <div className="timeline-item completed">

              <div className="timeline-icon">
                ✓
              </div>

              <div>
                <h3>
                  Consent Given
                </h3>

                <p>
                  Consent was provided for information verification.
                </p>
              </div>

            </div>


            <div className="timeline-item completed">

              <div className="timeline-icon">
                ✓
              </div>

              <div>
                <h3>
                  Information Verified
                </h3>

                <p>
                  Identity and address information was verified.
                </p>
              </div>

            </div>


            <div className="timeline-item active-timeline">

              <div className="timeline-icon">
                !
              </div>

              <div>
                <h3>
                  Under Verification
                </h3>

                <p>
                  Your business licence application is being reviewed.
                </p>
              </div>

            </div>


            <div className="timeline-item pending">

              <div className="timeline-icon">
                ○
              </div>

              <div>
                <h3>
                  Licence Approval
                </h3>

                <p>
                  Pending completion of verification.
                </p>
              </div>

            </div>


            <div className="timeline-item pending">

              <div className="timeline-icon">
                ○
              </div>

              <div>
                <h3>
                  Licence Issued
                </h3>

                <p>
                  Your licence will be issued after approval.
                </p>
              </div>

            </div>

          </div>


          <Link to="/dashboard">

            <button className="primary-button tracker-back">
              Back to Dashboard
            </button>

          </Link>

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

export default ApplicationTracker;