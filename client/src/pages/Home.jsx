import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

function Home() {
  const [email, setEmail] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const Navigate = useNavigate();

  const goToMainGame = () => {
    Navigate("/game"); // Redirect to the MainGame page
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
    <section>
      <div>
      <h1 className="py-10">Welcome {email ? `${email}` : "to the Home Page"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-['Press_Start_2P'] text-6xl font-bold border-4 border-rounded rounded-xl bg-[#F0622D] p-8 my-4 text-outline-thick"><span className="text-[#1d428a]">N</span><span className="text-white">B</span><span className="text-[#c8102e]">A</span><span className="text-white">-DLE</span></h1>
        <h3 className="py-4">Guess the Mystery Player with 5 guesses!</h3>
        <button onClick={goToMainGame} className="font-[bungee] border border-rounded text-5xl hover rounded-md p-2 border-[4px] text-white border-[#1d428a] bg-[#1d428a] cursor-pointer blueShadow blueShadow:hover"> Play Now!</button>
      </div>
      
    </section>
  );
}

export default Home;
