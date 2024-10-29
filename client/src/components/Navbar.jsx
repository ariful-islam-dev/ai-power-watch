import React from "react";
import logo from "../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import Button from "./Button";
import DarkModeToggle from "./DarkMoodToggle";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  return (
    <div>
      <nav className="bg-gray-200 border-b-2 border-gray-200 shadow-md dark:border-teal-900 dark:bg-teal-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="AI Power Watch Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AI Power Watch
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-teal-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="flex flex-col p-2 mt-4 font-medium rounded-lg md:gap-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
             <li className="flex items-center">
                <Link
                  to="/shop"
                  className="block py-2 pl-3 pr-4 text-white uppercase bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Shop
                </Link>
              </li>
             <li className="flex items-center order-1 col-span-2 md:order-1">
                <DarkModeToggle/>
              </li>
              <li className="order-3 md:order-2">
                <form>
                  <div className="flex items-center px-2 py-1 border border-teal-300 rounded-md bg-gray-50 dark:bg-gray-700 justify-centerborder focus:border-teal-500 focus:ring-teal-500 dark:focus:border-teal-500 dark:border-gray-600 dark:focus:ring-teal-500">   
                    <input
                      type="search"
                      id="default-search"
                      className="w-full p-2 text-sm text-gray-900 bg-transparent border border-none outline-none dark:placeholder-gray-400 dark:text-white"
                      placeholder="Search Mockups, Logos..."
                      required
                    />
                   <button className="inset-y-0 left-0 flex items-center border-teal-300 rounded-md"><IoSearchSharp className="w-8 h-8"/></button>
                  </div>
                </form>
              </li>
             
              <li className="order-2 col-span-2 my-2 md:my-0 md:order-3">
                <Button btnStyle="flex justify-center items-center h-full">Login</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
