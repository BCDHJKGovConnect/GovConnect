import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApplyLicence from "./pages/ApplyLicence";
import Consent from "./pages/Consent";
import VerifiedInformation from "./pages/VerifiedInformation";
import Application from "./pages/Application";
import ApplicationTracker from "./pages/ApplicationTracker";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Citizen Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Business Licence */}
        <Route path="/apply" element={<ApplyLicence />} />

        {/* Consent */}
        <Route path="/apply/consent" element={<Consent />} />

        {/* Verified Information */}
        <Route
          path="/apply/verified-information"
          element={<VerifiedInformation />}
        />

        {/* Application Form */}
      <Route
           path="/apply/application"
            element={
            <ProtectedRoute>
            <Application />
            </ProtectedRoute>
                    }
/>

        {/* Application Tracker */}
        <Route
          path="/application/:id"
          element={<ApplicationTracker />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;