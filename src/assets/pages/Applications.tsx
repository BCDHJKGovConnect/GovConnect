import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { applications } from "../data/dummyData";

function Applications() {
  return (
    <div>
      <h1>Application Management</h1>

      <section className="panel">
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Citizen</th>
              <th>Application</th>
              <th>Property</th>
              <th>Tax</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.citizenName}</td>
                <td>{application.applicationType}</td>

                <td>
                  <StatusBadge
                    status={application.propertyVerification}
                  />
                </td>

                <td>
                  <StatusBadge
                    status={application.taxVerification}
                  />
                </td>

                <td>
                  <StatusBadge status={application.status} />
                </td>

                <td>
                  <Link to={`/applications/${application.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Applications;