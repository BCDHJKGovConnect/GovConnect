import { useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { applications } from "../data/dummyData";

function ApplicationDetails() {
  const { id } = useParams();

  const application = applications.find(
    (item) => item.id === id
  );

  if (!application) {
    return <h1>Application not found</h1>;
  }

  return (
    <div>
      <h1>Application Details</h1>

      <section className="panel">
        <h2>{application.id}</h2>

        <p>
          <strong>Citizen:</strong> {application.citizenName}
        </p>

        <p>
          <strong>Application:</strong>{" "}
          {application.applicationType}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <StatusBadge status={application.status} />
        </p>
      </section>

      <section className="panel">
        <h2>Verification Status</h2>

        <div className="verification-item">
          <span>Property Verification</span>
          <StatusBadge
            status={application.propertyVerification}
          />
        </div>

        <div className="verification-item">
          <span>Tax Verification</span>
          <StatusBadge
            status={application.taxVerification}
          />
        </div>
      </section>
    </div>
  );
}

export default ApplicationDetails;