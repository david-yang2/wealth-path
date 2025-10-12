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
            <div className="flex flex-col items-start h-[60%] justify-center bg-slate-100 px-4 rounded-lg">
                <h2 className="text-2xl font-bold">Please Login:</h2>
                <form className="flex flex-col"
                onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={username}
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full my-5 border-4 borde-gray-600 px-3"
                    />
                    <input
                        type = "password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full my-5 border-4 borde-gray-600 px-3"
                    />
                    <button 
                    className='w-full bg-green-300 rounded-md py-3 text-xl'
                    type="submit">Login</button>
                </form>
            </div>
        )
    }



export default Login