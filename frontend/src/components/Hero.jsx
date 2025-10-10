import React, { useEffect, useState } from "react";
import icons from "../assets/icons/icon";
import { Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";

const { IoBookmarkOutline, IoBookOutline } = icons;

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await GlobalApi.fetchUpcomingMovie();

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setMovie(data[randomIndex]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="relative w-full h-[520px] rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900/20 animate-pulse"></div>
    );

  if (!movie) return null;

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden group">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="absolute bottom-8 left-10 right-10 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg line-clamp-2">
          {movie.title}
        </h2>
        {movie.overview && (
          <p className="text-white/90 text-base md:text-lg max-w-2xl line-clamp-2 drop-shadow-md">
            {movie.overview}
          </p>
        )}

        <div className="flex space-x-4 pt-2">
          <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-full ">
            <IoBookmarkOutline className="w-5 h-5" />
            <span>Save for Later</span>
          </button>
          <Link to={`/movie/${movie.id}`}>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full ">
              <IoBookOutline className="w-5 h-5 fill-white" />
              <span>Read More</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
