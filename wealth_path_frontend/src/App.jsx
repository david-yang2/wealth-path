import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
import Logout from "./components/Logout"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"



const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
