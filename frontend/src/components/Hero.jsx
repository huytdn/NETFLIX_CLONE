import React, { useEffect, useState } from "react";
import HeroBg from "../assets/images/herobg2.jpg";
import icons from "../assets/icons/icon";
import { Link } from "react-router-dom";

const { IoBookmarkOutline, IoPlayOutline } = icons;
const Hero = () => {
  const [movie, setMovie] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTE3MzZkMDg0Y2ZhNGViYTM0MWE5NDJiNzkxYTYwNiIsIm5iZiI6MTc1NTk0Nzk2OC44OTkwMDAyLCJzdWIiOiI2OGE5YTNjMGU4MTYzNjQwYjM3ODE4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eo1yUH8yzK7Jr0gHm1duEpFh_qmx9I4x4YkWXNEKSQA",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movie) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="bg-img"
        className="w-full rounded-2xl h-[520px] object-center object-cover"
      />
      <div className="flex space-x-2 md:space-x-4 absolute bottom-3  left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <IoBookmarkOutline className="h-6 w-6  mr-2 md:h-5 md:w-5" />
          Save for Later
        </button>
        <Link to={`/movie/${movie.id}`}>
          <button className="flex justify-center items-center bg-[#e50914] hover:bg-red-700 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <IoPlayOutline className="h-6 w-6 mr-2 md:h-5 md:w-5" />
            Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
