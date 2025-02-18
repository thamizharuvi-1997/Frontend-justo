import { useEffect, useState } from "react";
import Login from "./Login";
import TokenVerification from "./TokenVerification";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNormalUser, setisNormalUser] = useState("");

  // console.log(isLoggedIn)
  useEffect(() => {
   const CurrentRole= localStorage.getItem("userRole")
   setisNormalUser(CurrentRole);
    // console.log(isNormalUser)
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true); 
    }
   
  }, []);

  // console.log(isNormalUser)

  const handleLoginSuccess = (id, authToken) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("authToken", authToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} style={{ position: "absolute", top: 10, right: 10 }}>
            Logout
          </button>
          { isNormalUser ==="user" ? <TokenVerification /> : <AdminDashboard />}
          {/* { !isNormalUser && <AdminDashboard />} */}
        </>
      ) : (
        <>
        <Login onSuccess={handleLoginSuccess} />
        </>
      )}
    </div>
  );
}

export default App;
