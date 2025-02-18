import { useState, useEffect } from "react";
import axios from "axios";

function VerifyToken() {
  const [message, setMessage] = useState("");
  const [serverTime, setServerTime] = useState("");
  const [isVerified, setIsVerified] = useState(false);
 
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");  

  useEffect(() => {
    if (!token || !userId) {
      setMessage("You must be logged in to verify the token.");
      return;
    }
 
    verifyToken();
  }, [token, userId]);

  const verifyToken = async () => {
    try {
      const response = await axios.post("http://localhost:7000/api/verify-token", {
        userId,
        token
      });

      setMessage(response.data.message);
      setServerTime(response.data.serverTime);
      setIsVerified(true);  
    } catch (error) {
      setMessage(error.response?.data?.error || "Token verification failed");
      setServerTime("");
      setIsVerified(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verify Token</h2>

      <h3>{message}</h3>
      {isVerified && serverTime && <p>Server Time: {serverTime}</p>}
    </div>
  );
}

export default VerifyToken;
