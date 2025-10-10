import {useState} from "react"
import {useNavigate} from "react-router"
import useAuth from "./useAuth"
import { checkauth } from "./checkauth"
const BASE_URL= import.meta.env.VITE_BASE_API_URL



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {setUser} = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

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

        // const data = await response.json();
        console.log("Login successful:", response.status);
        const authdata = await checkauth()
        if (authdata?.isAuthenticated) setUser(authdata.username)
        navigate(`/transactions`)


        } catch (err) {
        setError(err.message);
        }
    };


        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                    </label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>
                        Password
                    </label>
                    <input
                        type = "password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }



export default Login