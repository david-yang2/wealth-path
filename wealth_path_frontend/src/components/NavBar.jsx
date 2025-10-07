import {Link} from "react-router-dom"

const NavBar = () => {
    return (
    <div className="flex flex-row justify-between bg-slate-100  px-2 py-5">
        <div className="text-xl">
            Wealth Path
        </div>
        <nav className="flex flex-row justify-around border-2 border-red-200 w-1/3 text-l">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/transactions">Transactions</Link>
        </nav>
      </div>
    )
}

export default NavBar;