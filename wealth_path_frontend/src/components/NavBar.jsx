import {Link} from "react-router-dom"
import useAuth from "./useAuth";

const NavBar = () => {

    const {user} = useAuth()

    return (
    <div className="flex flex-row justify-between bg-slate-100  px-2 py-5 h-24">
        <div className="text-2xl font-bold flex items-center pl-5 border-2 border-red-200 w-1/3">
            Wealth Path
        </div>
        {user ? (
        <nav className="flex flex-row justify-around items-center border-2 border-red-200 w-1/3 text-l">
            <Link to="/transactions">Transactions</Link>
            <Link to="/logout">Logout</Link>
        </nav>
        ) : (

            <nav className="flex flex-row justify-around border-2 border-red-200 w-1/3 text-l">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>

        </nav>
        )
        }
      </div>
    )
}

export default NavBar;