import { Link } from "react-router";

const NavModal = (props) => {
  const { user, onClose } = props;
  return (
    // backdrop
    <div className="fixed inset-0  flex items-center justify-center"
        onClick={onClose}>
      <div id="navmodal-container" 
            onClick = {e => e.stopPropagation()}
            className="absolute top-0 right-0 p-3 rounded-lg bg-slate-300 border-2 border-red-200">
        <button onClick={onClose}>

        <i
          className="fa-solid fa-xmark mb-3"
          ></i>
          </button>
        {user ? (
          <nav className="flex flex-col justify-around items-start w-1/3 text-2xl">
            <Link className="mb-3" to="/transactions">
              Transactions
            </Link>
            <Link className="mb-3" to="/logout">
              Logout
            </Link>
          </nav>
        ) : (
          <nav className="flex flex-col justify-around items-start w-1/3 text-2xl">
            <Link className="mb-3" to="/">
              Home
            </Link>
            <Link className="mb-3" to="/login">
              Login
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavModal;
