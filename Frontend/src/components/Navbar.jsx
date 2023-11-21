// import Cookies from 'js-cookie';
import eplLogo from "../assets/epl.png";
import toggleNavbar from "../scripts/toggleNavbar";

// const cookies = new Cookies();

const Navbar = () => {
  return (
    <nav className="select-none">
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="#" className="flex items-center px-2">
          <img
            src={eplLogo}
            className="h-14 md:h-16 lg:h-20 logo"
            alt="EPL Logo"
          />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none text-gray-400 hover:bg-gray-700"
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
        <div
          className="wrapper w-full md:grid-rows-1 md:w-auto"
          id="navbar-default"
        >
          <ul className="inner font-medium flex flex-col px-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a href="#" className="block py-2 px-2 rounded text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-2 rounded text-white">
                Match Schedule
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-2 rounded text-white">
                Tickets
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-2 rounded text-white">
                Profile
              </a>
            </li>
            <li className="flex justify-center">
              <button className="block py-2 px-4 rounded text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
