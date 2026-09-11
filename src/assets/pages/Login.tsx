import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/dashboard");
      return;
    }

    alert("Invalid admin credentials");
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;