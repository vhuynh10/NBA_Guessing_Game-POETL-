import { useState, useEffect } from "react";
import axios from "axios"; 
import MainGame from "../components/MainGame";

function Home() {
  const [email, setEmail] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const[showGame, setShowGame] = useState(false);

  function handleShowGame() {
    setShowGame(!showGame);
  }

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
    <section className="flex flex-col items-center w-full font-[lexend] bg-[#fdfbd4] h-screen overflow-hidden ">
      <div>
      <h1 className="py-20">Welcome {email ? `${email}` : "to the Home Page"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
      </div>

      <div>
        {!showGame && (<button onClick={handleShowGame} className="font-[bungee] border border-rounded text-5xl hover rounded-md p-2 border-[4px] text-white border-[#1d428a] bg-[#1d428a] cursor-pointer blueShadow blueShadow:hover"> Play Now!</button>)}
        {showGame && (<MainGame/>)}
      </div>
      
    </section>
  );
}

export default Home;
