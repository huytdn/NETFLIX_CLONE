import React from "react";
import HeroBg from "../assets/images/herobg2.jpg";
import icons from "../assets/icons/icon";

const { IoBookmarkOutline, IoPlayOutline } = icons;
const Hero = () => {
  return (
    <div className="text-white relative">
      <img
        src={HeroBg}
        alt="bg-img"
        className="w-full rounded-2xl h-[480px] object-center object-cover"
      />
      <div className="flex space-x-2 md:space-x-4 absolute bottom-3  left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <IoBookmarkOutline className="h-6 w-6  mr-2 md:h-5 md:w-5" />
          Save for Later
        </button>
        <button className="flex justify-center items-center bg-[#e50914] hover:bg-red-700 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <IoPlayOutline className="h-6 w-6 mr-2 md:h-5 md:w-5" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
