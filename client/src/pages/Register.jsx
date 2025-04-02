import { useState } from "react";
import axios from "axios"; 

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

  
    try {
      // Send POST request to backend to handle registration
      const response = await axios.post("http://localhost:5002/api/auth/register", {
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
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
