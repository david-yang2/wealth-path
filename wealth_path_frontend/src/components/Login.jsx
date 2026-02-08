import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "./auth/useAuth";
import { checkauth } from "./auth/checkauth";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser, protectedRouteMessage, setProtectedRouteMessage } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`${BASE_URL}/token/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        
        if (!response.ok) {
            throw new Error("Invalid username or password");
        }
        
        //   // const data = await response.json();
        //   console.log("Login successful:", response.status);
        const authdata = await checkauth();
        if (authdata?.isAuthenticated) setUser(authdata.username);
      setError("");
      setProtectedRouteMessage("")
      navigate(`/dashboard`);

    } catch (err) {
      setProtectedRouteMessage("")
      setError(err.message);
    }
  };


  return (
    <div id="login-component" className="w-full h-full flex items-start md:items-center md:w-auto">
      <div id="login-container" className="flex flex-col items-center md:items-start justify-center w-full h-auto py-10 bg-slate-100 md:px-10 md:py-[20%] rounded-lg">
        {protectedRouteMessage && (<div className="text-red-500 mb-3">{protectedRouteMessage}</div>)}
        <h2 className="text-3xl font-bold mb-2">Login:</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required

          />
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required

          />
          { error ? (<div className="text-red-600 mt-2 mb-4">{error}</div>) : (<div></div> )}
          <button
            className="w-full bg-green-300 rounded-md mt-3 py-3 text-xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
