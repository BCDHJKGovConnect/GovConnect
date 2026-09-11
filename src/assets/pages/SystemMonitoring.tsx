import StatusBadge from "../components/StatusBadge";
import { monitoringServices } from "../data/dummyData";

function SystemMonitoring() {
  return (
    <div>
      <h1>System Monitoring</h1>

      <div className="monitoring-grid">
        {monitoringServices.map((service) => (
          <div className="monitor-card" key={service.name}>
            <h2>{service.name}</h2>

            <StatusBadge status={service.status} />

            <p>
              {service.status === "ONLINE"
                ? "Service is operating normally."
                : "Service requires attention."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemMonitoring;