import { createContext, useState, useEffect } from "react";
import { checkauth } from "./checkauth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await checkauth();

        // if data.isAuthenticated === true
        if (data?.isAuthenticated) {
          // set user to data.username
          setUser(data.username);
          // else set it to null
        } else {
          console.log("not authenticated");
          setUser(null);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setUser(null);
      }
    };
    verifyUser();
    console.log("checking auth", user);
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
