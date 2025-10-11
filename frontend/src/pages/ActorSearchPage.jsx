import React, { useState, useEffect } from "react";
import icons from "../assets/icons/icon";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/UI/card";
import { Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";

const { IoSearchOutline, IoIosStar, FaRegUserCircle } = icons;

const ActorSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popularActors, setPopularActors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  // fetch popular actors
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await GlobalApi.getPopularActor();
      setPopularActors(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // search actors
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      const results = await GlobalApi.searchActor(searchQuery);
      setSearchResults(results);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const displayActors =
    searchQuery.trim() !== "" ? searchResults : popularActors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaRegUserCircle className="w-10 h-10 text-red-400" />
            <h1 className="text-5xl font-bold text-white">Search Actor</h1>
          </div>
          <p className="text-red-200 text-lg">
            Discover popular actors and search for your favorites
          </p>
        </div>

        {/* search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-300" />
            <Input
              type="text"
              placeholder="Search for actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/10 border-red-400/30 text-white placeholder:text-red-200/50 focus:border-red-400 focus:ring-red-400/20"
            />
          </div>
        </div>

        {/* title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            {searchQuery.trim() !== "" ? "Search Results" : "Popular Actors"}
          </h2>
          <div className="h-1 w-24 bg-red-500 mt-2 rounded-full"></div>
        </div>

        {/* actor gird */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/10 rounded-lg h-96"
              ></div>
            ))}
          </div>
        ) : displayActors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayActors.map((actor) => (
              <Link key={actor.id} to={`/actors/${actor.id}`}>
                <Card
                  key={actor.id}
                  className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {actor.profile_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-900 to-slate-900 flex items-center justify-center">
                          <FaRegUserCircle className="w-16 h-16 text-red-400/30" />
                        </div>
                      )}

                      {/* badge */}
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <IoIosStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">
                          {actor.popularity?.toFixed(0)}
                        </span>
                      </div>

                      {/* department badge */}
                      <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white uppercase">
                        {actor.known_for_department || "Actor"}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base line-clamp-2 mb-2">
                        {actor.name}
                      </h3>
                      {actor.known_for && actor.known_for.length > 0 && (
                        <p className="text-red-200/70 text-sm line-clamp-1">
                          Known for:{" "}
                          {actor.known_for[0].title || actor.known_for[0].name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaRegUserCircle className="w-20 h-20 text-red-400/30 mx-auto mb-4" />
            <p className="text-red-200/70 text-xl">
              {searchQuery.trim() !== ""
                ? "No actors found. Try a different search."
                : "No popular actors available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorSearchPage;
