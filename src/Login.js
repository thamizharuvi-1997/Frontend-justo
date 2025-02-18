import { useState } from "react";
import axios from "axios";

function Login() {
  const [isRegister, setIsRegister] = useState(false); 
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");  
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [detail, setDetail] = useState({});

//   console.log(isRegister)
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:7000/api/login", {
        identifier,
        password
      });
    //   console.log(response)
      setMessage(response.data.message);
      setToken(response.data.token);
      setDetail(response.data.user);

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userMail", user.mail);
      localStorage.setItem("userRole", user.role);
      window.location.reload();
    } catch (error) {
    //   console.log(error)

      setMessage(error.response?.data?.error || "Something went wrong");
      setToken("");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:7000/api/register", {
        mail: identifier,
        phone,
        password
      });
    //   console.log(response)

      setMessage(response.data.message);
      setIsRegister(false);  
    } catch (error) {
    //   console.log(erro)r

      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <input
        type="text"
        placeholder="Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <br /><br />

      {isRegister && (
        <>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br /><br />
        </>
      )}

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {isRegister ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>

      <h3>{message}</h3>
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default Login;
