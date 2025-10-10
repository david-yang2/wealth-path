import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
import Logout from "./components/Logout"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthProvider from "./components/AuthContext"


const App = () => {

  return (
    <AuthProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} /> 
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
