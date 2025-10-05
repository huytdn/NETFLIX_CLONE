import React, { useState } from "react";
import icons from "../assets/icons/icon";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const {
  IoSearchOutline,
  MdOutlineHelpCenter,
  MdOutlineSettings,
  MdOutlineLogout,
} = icons;
const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const avatarURL = user
    ? `
https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(
        user.username
      )} `
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-semibold text-nowrap">
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-32 brightness-125 cursor-pointer"
        />
      </Link>

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
        <Link to={user ? "ai-recommendations" : "signin"}>
          <button className="bg-[#e50914] cursor-pointer px-5 py-2 rounded-full hover:bg-red-700">
            Get AI Movie Picks
          </button>
        </Link>
        {!user ? (
          <Link to={"/signin"}>
            <button className="bg-[#333333] cursor-pointer px-5 py-2 rounded-full hover:bg-gray-600">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white">
            <img
              src={avatarURL}
              alt="avatar"
              className=" w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <MdOutlineHelpCenter className="w-5 h-5" />
                  Help Center
                </button>
                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <MdOutlineSettings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer"
                >
                  <MdOutlineLogout className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
