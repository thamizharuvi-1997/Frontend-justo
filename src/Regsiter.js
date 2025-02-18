import { useState } from "react";
import axios from "axios";

function Register({ onSwitchToLogin }) {
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password
    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/api/register", {
        mail,
        phone,
        password,
      });

    //   console.log(response)
      alert(response.data.message);
      setError(""); 
      onSwitchToLogin(); 
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Register;
