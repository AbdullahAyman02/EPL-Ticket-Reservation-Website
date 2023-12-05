import Logo from "../assets/Logo.png";
import toggleNavbar from "../scripts/toggleNavbar";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar" className="z-10 top-0 w-full bg-[#360137] bg-opacity-50">
      <Link to="/" className="flex items-center px-2">
        <img
          src={Logo}
          className="absolute left-[45vw] md:left-[47vw] top-1 h-12 md:h-20 lg:h-18 logo"
          alt="EPL Logo"
        />
      </Link>
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden focus:outline-none text-gray-400 hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open navbar</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="wrapper w-full lg:grid-rows-1" id="navbar-default">
          <ul className="inner font-medium flex flex-col w-full px-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link to="/" className="block py-2 px-2 rounded text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="block py-2 px-2 rounded text-white"
              >
                Match Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/tickets"
                className="block py-2 px-2 rounded text-white"
              >
                Tickets
              </Link>
            </li>
            <li className="flex flex-grow justify-center md:justify-end">
              {Cookies.get("token") ? (
                <>
                  <Link to="/login" className="mx-4">
                    <button className="block  py-2 px-4 rounded text-white bg-black font-bold">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="block py-2 px-4 rounded text-white bg-black font-bold">
                      Signup
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button className="block py-2 px-4 rounded text-white bg-black font-bold">
                    Logout
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
