import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Transactions from "./components/Transactions";
import Login from "./components/Login";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthProvider from "./components/auth/AuthContext";

const App = () => {

  return (
    <AuthProvider>
      <div className="flex flex-col h-full w-full">
        <BrowserRouter>
          <div className="w-full flex justify-center">
          <NavBar />
          </div>
          <div className="flex flex-1 justify-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
