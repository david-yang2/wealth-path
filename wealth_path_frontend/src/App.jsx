import {BrowserRouter,Routes,Route} from "react-router-dom"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
import HomePage from "./components/HomePage"



const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
