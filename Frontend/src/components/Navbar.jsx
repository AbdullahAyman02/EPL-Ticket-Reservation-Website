import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import toggleNavbar from "../scripts/toggleNavbar";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setIsLoggedIn(false);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    navigate("/");
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

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
            {Cookies.get("role") == "F" && (
              <li>
                <Link
                  to="/mytickets"
                  className="block py-2 px-2 rounded text-white"
                >
                  Tickets
                </Link>
              </li>
            )}
            {Cookies.get("role") == "F" && (
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-2 rounded text-white"
                >
                  Profile
                </Link>
              </li>
            )}
            {Cookies.get("role") == "A" && (
              <li>
                <Link
                  to="/admin"
                  className="block py-2 px-2 rounded text-white"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="flex flex-grow justify-center md:justify-end">
              {!isLoggedIn ? (
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
                <>
                  <p className="p-2">
                    Logged in as{" "}
                    <span className="font-bold">{Cookies.get("username")}</span>
                  </p>
                  <button
                    className="block py-2 px-4 rounded text-white bg-black font-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
