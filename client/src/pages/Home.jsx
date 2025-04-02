import { useState, useEffect } from "react";
import axios from "axios"; 

function Home() {
  const [email, setEmail] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setLoading(false); // If no token is found, we're done
        console.log("No token found. User is not authenticated.");
        return; 
      }

      try {
        // Send token to the backend to verify the user session
        const response = await axios.post("http://localhost:5002/api/auth/getUser", { token });

        if (response.data.user) {
          setEmail(response.data.user.email); // Set the email from the backend response
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError("Failed to authenticate. Please login again.");
      } finally {
        setLoading(false); // Stop loading once the check is done
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Welcome {email ? `${email}` : "to the Home Page"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
    </div>
  );
}

export default Home;
