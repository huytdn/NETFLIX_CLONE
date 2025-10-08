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
  IoMdMenu,
  IoCloseCircleOutline,
} = icons;

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const avatarURL = user
    ? `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-semibold relative z-50">
      {/* logo */}
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-32 brightness-125 cursor-pointer"
        />
      </Link>

      {/* desktop links */}
      <ul className="hidden xl:flex space-x-10 text-[18px]">
        <Link to={"/"} className="cursor-pointer hover:text-[#e50914]">
          Home
        </Link>
        <Link to={"/actor"} className="cursor-pointer hover:text-[#e50914]">
          Actor
        </Link>
        <Link
          to={"/searchmovies"}
          className="cursor-pointer hover:text-[#e50914]"
        >
          Search Movies
        </Link>
        <Link to={"/anime"} className="cursor-pointer hover:text-[#e50914]">
          Anime
        </Link>
        <Link to={"/watchList"} className="cursor-pointer hover:text-[#e50914]">
          WatchList
        </Link>
        <Link to={"/upcoming"} className="cursor-pointer hover:text-[#e50914]">
          Upcoming
        </Link>
      </ul>

      <div className="flex items-center space-x-4 relative">
        {/* sêarch */}
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
          />
          <IoSearchOutline className="absolute right-3 w-6 h-6 top-1.5" />
        </div>

        {/* aisearch */}
        <Link to={user ? "ai-recommendations" : "signin"}>
          <button className="bg-[#e50914] cursor-pointer px-5 py-2 rounded-full hover:bg-red-700">
            Get AI Movie Picks
          </button>
        </Link>

        {/* login */}
        {!user ? (
          <Link to={"/signin"}>
            <button className="bg-[#333333] cursor-pointer px-5 py-2 rounded-full hover:bg-gray-600 hidden md:block">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white hidden md:block">
            <img
              src={avatarURL}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
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
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <MdOutlineHelpCenter className="w-5 h-5" />
                  Help Center
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <MdOutlineSettings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer"
                >
                  <MdOutlineLogout className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* menu icon */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden focus:outline-none relative z-50"
        >
          {mobileOpen ? (
            <IoCloseCircleOutline className="w-8 h-8 text-white" />
          ) : (
            <IoMdMenu className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 
    text-2xl text-white z-40 animate-slide-down"
        >
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            Home
          </Link>
          <Link
            to="/actor"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            Actor
          </Link>
          <Link
            to="/searchmovies"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            Search Movies
          </Link>
          <Link
            to="/anime"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            Anime
          </Link>
          <Link
            to="/games"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            WatchList
          </Link>
          <Link
            to="/watchList"
            onClick={() => setMobileOpen(false)}
            className="hover:text-[#e50914]"
          >
            Upcoming
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#e50914] px-6 py-2 rounded-full hover:bg-red-700 text-white mt-5"
            >
              Log Out
            </button>
          ) : (
            <Link to="/signin" onClick={() => setMobileOpen(false)}>
              <button className="bg-[#e50914] px-6 py-2 rounded-full hover:bg-red-700 text-white mt-5">
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
