import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your backend to handle login
      const response = await axios.post("http://localhost:5002/api/auth/login", {
        email: formData.username, // Treating username as email for Supabase authentication
        password: formData.password,
      });

      // Store the session token in localStorage after successful login
      localStorage.setItem("token", response.data.session.access_token);

      // Redirect the user to the home page after successful login
      navigate("/");

      // Handle success
      alert("Login successful!");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
