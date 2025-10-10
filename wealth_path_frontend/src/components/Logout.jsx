import {useNavigate} from "react-router"
import useAuth from "./useAuth"

const BASE_URL = import.meta.env.VITE_BASE_API_URL

const Logout = () => {
    const navigate = useNavigate()
    const {setUser} = useAuth();

    const logout = async (e) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/logout/`, {
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()
        if (data?.success) setUser(null)
        navigate("/")
    }


    return <div>
        <button onClick={logout}>Logout</button>
    </div>
}


export default Logout;