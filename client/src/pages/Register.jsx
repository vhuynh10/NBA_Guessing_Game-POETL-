import { useState } from "react";
import axios from "axios"; 

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Send POST request to backend using API_URL
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email: formData.username, // username as email
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // Handles success
      setError(null);
      setSuccess(response.data.message);
    } catch (error) {
      // Handles error 
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          className="border border-2px bg-white flex flex-row"
          type="text"
          name="username"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="border border-2px bg-white flex flex-row"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="border border-2px bg-white flex flex-row cursor-pointer">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;