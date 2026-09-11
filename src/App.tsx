import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./assets/components/Sidebar";
import Header from "./assets/components/Header";

import Login from "./assets/pages/Login";
import Dashboard from "./assets/pages/Dashboard";
import InteroperabilityHub from "./assets/pages/InteroperabilityHub";
import Applications from "./assets/pages/Applications";
import ApplicationDetails from "./assets/pages/ApplicationDetails";
import AuditDashboard from "./assets/pages/AuditDashboard";
import SystemMonitoring from "./assets/pages/SystemMonitoring";

function AdminLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Header />

        <main className="content">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/hub"
              element={<InteroperabilityHub />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/applications/:id"
              element={<ApplicationDetails />}
            />

            <Route
              path="/audit"
              element={<AuditDashboard />}
            />

            <Route
              path="/monitoring"
              element={<SystemMonitoring />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/*"
          element={<AdminLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;