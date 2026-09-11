import StatusBadge from "../components/StatusBadge";
import { connectedSystems } from "../data/dummyData";

function InteroperabilityHub() {
  return (
    <div>
      <h1>Interoperability Hub</h1>

      <div className="hub-flow">
        <div className="flow-box">
          Citizen Portal
        </div>

        <div className="arrow">↓</div>

        <div className="flow-box main-flow">
          Interoperability Hub
        </div>

        <div className="arrow">↓</div>

        <div className="department-flow">
          {connectedSystems.map((system) => (
            <div className="flow-box" key={system.name}>
              <h3>{system.name}</h3>
              <StatusBadge status={system.status} />
            </div>
          ))}
        </div>
      </div>

      <section className="panel">
        <h2>Data Orchestration</h2>

        <p>
          The Interoperability Hub receives requests, routes them
          to government departments, transforms data into a common
          format, and returns the combined result.
        </p>
      </section>

      <section className="panel">
        <h2>Identity Resolution Example</h2>

        <div className="mapping">
          <p>Property owner_ref: <strong>P458</strong></p>
          <p>Revenue taxpayer_id: <strong>T782</strong></p>
          <p>Identity citizen_id: <strong>101</strong></p>

          <hr />

          <p>
            Resolved Citizen:
            <strong> Ananya</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

export default InteroperabilityHub;