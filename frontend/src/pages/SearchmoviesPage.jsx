import React, { useState, useEffect } from "react";
import icons from "../assets/icons/icon";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";

const { IoSearchOutline, FiFilm, IoIosStar } = icons;

const SearchmoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  // fetch trending movies
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await GlobalApi.getTrending();
      setTrendingMovies(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // search movies
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      const results = await GlobalApi.searchMovies(searchQuery);
      setSearchResults(results);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const displayMovies =
    searchQuery.trim() !== "" ? searchResults : trendingMovies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiFilm className="w-10 h-10 text-red-400" />
            <h1 className="text-5xl font-bold text-white">Search Movie</h1>
          </div>
          <p className="text-red-200 text-lg">
            Discover trending movies and search for your favorites
          </p>
        </div>

        {/* search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-300" />
            <Input
              type="text"
              placeholder="Search for movies or TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/10 border-red-400/30 text-white placeholder:text-red-200/50 focus:border-red-400 focus:ring-red-400/20"
            />
          </div>
        </div>

        {/* section title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            {searchQuery.trim() !== "" ? "Search Results" : "Trending Now"}
          </h2>
          <div className="h-1 w-24 bg-red-500 mt-2 rounded-full"></div>
        </div>

        {/* grid movie */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/10 rounded-lg h-96"
              ></div>
            ))}
          </div>
        ) : displayMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayMovies.map((movie) => (
              <Card
                key={movie.id}
                className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <CardContent className="p-0">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title || movie.name}
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
                          {movie.vote_average?.toFixed(1) || "N/A"}
                        </span>
                      </div>

                      {/* badge */}
                      <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white uppercase">
                        {movie.media_type || "movie"}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base line-clamp-2 mb-2">
                        {movie.title || movie.name}
                      </h3>
                      <p className="text-red-200/70 text-sm">
                        {movie.release_date?.split("-")[0] ||
                          movie.first_air_date?.split("-")[0] ||
                          "N/A"}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiFilm className="w-20 h-20 text-red-400/30 mx-auto mb-4" />
            <p className="text-red-200/70 text-xl">
              {searchQuery.trim() !== ""
                ? "No movies found. Try a different search."
                : "No trending movies available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchmoviesPage;
