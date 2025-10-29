import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Transactions from "./components/Transactions";
import Login from "./components/Login";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthProvider from "./components/auth/AuthContext";
import useWindowWidth from "./components/useWindowWidth";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  // Layout of paths and to call useLocation()
  const Layout = () => {
    const width = useWindowWidth();
    const location = useLocation();

    const showNavBar = width >= 768 || location.pathname !== "/";

    return (
      <div className="flex flex-col h-full w-full">
        <div className="w-full flex justify-center">
          {showNavBar && <NavBar />}
        </div>
        <div className="flex flex-1 justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />  
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
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className="flex flex-col h-full w-full">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
