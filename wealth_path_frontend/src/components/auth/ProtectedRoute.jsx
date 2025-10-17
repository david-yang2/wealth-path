import useAuth from "./useAuth"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {

    const {user} = useAuth();
    console.log(user)
    if (!user) return <Navigate to="/login/" repalce />
    return children

}

export default ProtectedRoute;