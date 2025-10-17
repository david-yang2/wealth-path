import { Link } from "react-router"

const NavModal = ( props) => {
    const {user, setOpenMenu} = props
    return <div className="absolute top-0 left-0 p-3 rounded-lg bg-slate-300 border-2 border-red-200">
        <i onClick={() => setOpenMenu(false)}className="fa-solid fa-xmark mb-3"></i>
        {user ? (
        <nav className="flex flex-col justify-around items-start w-1/3 text-2xl">
            <Link className="mb-3" to="/transactions">Transactions</Link>
            <Link className="mb-3" to="/logout">Logout</Link>
        </nav>
        ) : (

            <nav className="flex flex-col justify-around items-start w-1/3 text-2xl">
            <Link className="mb-3" to="/">Home</Link>
            <Link className="mb-3" to="/login">Login</Link>

        </nav>
        )
        }

    </div>
}

export default NavModal