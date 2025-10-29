import { Link } from "react-router";

const NavModal = (props) => {
  const { user, onClose } = props;
  return (
    // backdrop
    <div
      id="backdrop"
      className="fixed inset-0  flex items-center justify-center"
      onClick={onClose}
    >
      {/* modal */}
      <div
        id="navmodal-container"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 p-3 rounded-lg bg-white h-auto pb-10 w-auto pr-5 shadow-lg"
      >
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark text-2xl mb-3"></i>
        </button>
        <nav className="flex flex-col justify-around items-start w-1/3 text-2xl">
          <Link to="/" onClick={onClose}>
            <i className="fa-regular fa-house"></i>
            Home
          </Link>
          <Link to="/dashboard" onClick={onClose}>
            <i className="fa-solid fa-grip"></i>
            Dashboard
          </Link>
          <Link to="/transactions" onClick={onClose}>
            <i className="fa-solid fa-money-check"></i>
            Transactions
          </Link>
          {user ? (
            <Link to="/logout" onClick={onClose}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </Link>
          ) : (
            <Link to="/login" onClick={onClose}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavModal;
