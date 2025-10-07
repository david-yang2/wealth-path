import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
import HomePage from "./components/HomePage"



const App = () => {

  return (
    <BrowserRouter>
      <nav className="flex flex-row justify-end">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
