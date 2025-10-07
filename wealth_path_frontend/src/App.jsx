import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
