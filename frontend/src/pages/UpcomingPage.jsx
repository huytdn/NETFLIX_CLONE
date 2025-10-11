import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/UI/card";
import icons from "../assets/icons/icon";
import { Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";

const { FaRegCalendarAlt, FiFilm, IoIosStar } = icons;

const UpcomingMovie = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await GlobalApi.fetchUpcomingMovie();
      setUpcomingMovies(data || []);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaRegCalendarAlt className="w-10 h-10 text-red-400" />
            <h1 className="text-5xl font-bold text-white">Upcoming Movies</h1>
          </div>
          <p className="text-red-200 text-lg">
            Discover the latest movies coming soon to theaters
          </p>
        </div>

        {/* section title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
          <div className="h-1 w-24 bg-red-500 mt-2 rounded-full"></div>
        </div>

        {/* movie grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/10 rounded-lg h-96"
              ></div>
            ))}
          </div>
        ) : upcomingMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {upcomingMovies.map((movie) => (
              <Card
                key={movie.id}
                className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <Link to={`/movie/${movie.id}`}>
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-900 to-slate-900 flex items-center justify-center">
                          <FiFilm className="w-16 h-16 text-red-400/30" />
                        </div>
                      )}

                      {/* rate */}
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <IoIosStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>

                      {/* date badge */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <div className="flex items-center gap-1 text-red-300">
                          <FaRegCalendarAlt className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {formatDate(movie.release_date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base line-clamp-2 mb-2">
                        {movie.title}
                      </h3>
                      <p className="text-red-200/70 text-sm line-clamp-2">
                        {movie.overview}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiFilm className="w-20 h-20 text-red-400/30 mx-auto mb-4" />
            <p className="text-red-200/70 text-xl">
              No upcoming movies available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMovie;
