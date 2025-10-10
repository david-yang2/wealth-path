import { createContext, useState, useEffect} from "react"
import {checkauth} from "./checkauth"


export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const verifyUser = async () => {
            const data = await checkauth()

            if (data?.isAuthenticated) {
                setUser(data.username)
            } else {
                console.log("not authenticated")
                setUser(null)
            }

        }
        verifyUser()
        console.log("checking auth", user)
        })



    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;