import { useEffect, useState } from "react";
import axios from "axios";

function TokenVerification() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [serverTime, setServerTime] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  useEffect(()=>{
    const userId = parseInt(localStorage.getItem("userId"));
    const savedToken = localStorage.getItem("authToken"); 

    setToken(savedToken)

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = parseInt(localStorage.getItem("userId")); 
    const savedToken = localStorage.getItem("authToken");  

    try {
      const response = await axios.post("http://localhost:7000/api/validated", {
        userId,
        token: savedToken  
      });
    //   console.log(response)
      setMessage(response.data.message);
      setServerTime(response.data.serverTime);
      setIsVerified(true);
    } catch (error) {
        // console.log(error)
      setMessage(error.response?.data?.error || "Token verification failed");
      setIsVerified(false);
      setServerTime("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verify Token</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          type="text" rows={6}
          placeholder="Enter Token"
          value={token}
          onChange={handleTokenChange}
          required
        />
        <button type="submit">Verify Token</button>
      </form>

      <h3>{message}</h3>
      {isVerified && serverTime && <p>Server Time: {serverTime}</p>}
    </div>
  );
}

export default TokenVerification;
