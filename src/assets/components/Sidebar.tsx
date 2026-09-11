import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>GovConnect</h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/hub">Interoperability Hub</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/audit">Audit Dashboard</NavLink>
        <NavLink to="/monitoring">System Monitoring</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;