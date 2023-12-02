// import Cookies from 'js-cookie';
import Logo from "../assets/Logo.png";
import toggleNavbar from "../scripts/toggleNavbar";

// const cookies = new Cookies();

const Navbar = () => {
  return (
    <nav id="navbar" className="z-10 top-0 w-full bg-[#360137] bg-opacity-50">
      <a href="#" className="flex items-center px-2">
        <img
          src={Logo}
          className="absolute left-[45vw] md:left-[47vw] top-1 h-12 md:h-20 lg:h-18 logo"
          alt="EPL Logo"
        />
      </a>
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
            <li className="flex flex-grow justify-center md:justify-end">
              <button className="block py-2 px-4 rounded text-white bg-black">
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
