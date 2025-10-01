import React from "react";
import icons from "../assets/icons/icon";
import logo from "../assets/images/logo.png";

const { IoSearchOutline } = icons;
const Navbar = () => {
  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-semibold text-nowrap">
      <img
        src={logo}
        alt="logo"
        className="w-32 brightness-125 cursor-pointer"
      />

      <ul className="hidden xl:flex space-x-10 text-[18px]">
        <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
        <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
          />
          <IoSearchOutline className="absolute right-3 w-6 h-6 top-1.5" />
        </div>
        <button className="bg-[#e50914] cursor-pointer px-5 py-2 rounded-full hover:bg-red-700">
          Get AI Movie Picks
        </button>
        <button className="bg-[#333333] cursor-pointer px-5 py-2 rounded-full hover:bg-gray-600">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
