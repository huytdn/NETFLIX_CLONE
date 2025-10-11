import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../assets/icons/icon";
import { Card, CardContent } from "@/components/UI/card";
import GlobalApi from "../services/GlobalApi";

const { FiFilm, IoIosStar, FaRegCalendarAlt, FaAward, LuMapPin } = icons;

const ActorPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState({ cast: [] });
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const IMAGE_BASE_URL2 = import.meta.env.VITE_IMAGE_BASE_URL2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await GlobalApi.getPersonDetails(id);
      if (data) {
        setPerson(data.person);
        setCredits(data.credits);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading || !person)
    return <p className="text-white text-center py-10">Loading...</p>;

  const sortedMovies = credits.cast
    .filter((movie) => movie.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 12);

  const imageUrl = person.profile_path
    ? `${IMAGE_BASE_URL2}${person.profile_path}`
    : "/actor-portrait.png";

  const posterUrl = person.profile_path
    ? `${IMAGE_BASE_URL}${person.profile_path}`
    : "/actor-portrait.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
      {/* hero section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={person.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
        </div>

        {/* hero content */}
        <div className="relative h-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={person.name}
                className="w-48 h-72 object-cover rounded-lg shadow-2xl border-4 border-white/10"
              />
            </div>

            <div className="flex-1 space-y-4 pb-4">
              <h1 className="text-5xl md:text-6xl font-bold">{person.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <IoIosStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">
                    {person.popularity?.toFixed(1)}
                  </span>
                  <span className="text-gray-400">Popularity</span>
                </div>

                {person.birthday && (
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="w-5 h-5 text-red-400" />
                    <span>{person.birthday}</span>
                  </div>
                )}

                {person.known_for_department && (
                  <div className="flex items-center gap-2">
                    <FaAward className="w-5 h-5 text-red-400" />
                    <span>{person.known_for_department}</span>
                  </div>
                )}
              </div>

              {person.place_of_birth && (
                <div className="flex items-center gap-2 text-gray-300">
                  <LuMapPin className="w-5 h-5 text-red-400" />
                  <span>{person.place_of_birth}</span>
                </div>
              )}

              {person.biography && (
                <p className="text-gray-300 max-w-3xl line-clamp-4 leading-relaxed">
                  {person.biography}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* details section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b border-red-500/30 pb-4">
          Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              Known For
            </h3>
            <p className="text-white text-lg">{person.known_for_department}</p>
          </div>

          {person.birthday && (
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-2">
                Birthday
              </h3>
              <p className="text-white text-lg">{person.birthday}</p>
            </div>
          )}

          {person.place_of_birth && (
            <div>
              <h3 className="text-gray-400 text-sm font-semibold mb-2">
                Place of Birth
              </h3>
              <p className="text-white text-lg">{person.place_of_birth}</p>
            </div>
          )}

          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              Popularity Score
            </h3>
            <p className="text-white text-lg">
              {person.popularity?.toFixed(2)}
            </p>
          </div>

          {person.also_known_as?.length > 0 && (
            <div className="md:col-span-2">
              <h3 className="text-gray-400 text-sm font-semibold mb-2">
                Also Known As
              </h3>
              <p className="text-white text-lg">
                {person.also_known_as.join(", ")}
              </p>
            </div>
          )}

          {person.biography && (
            <div className="md:col-span-2">
              <h3 className="text-gray-400 text-sm font-semibold mb-2">
                Biography
              </h3>
              <p className="text-white leading-relaxed">{person.biography}</p>
            </div>
          )}
        </div>
      </div>

      {/* movies section */}
      {sortedMovies.length > 0 && (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8 border-b border-red-500/30 pb-4 flex items-center gap-3">
            <FiFilm className="w-8 h-8 text-red-400" />
            Known For
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <Card
                key={movie.id}
                className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="p-4">
                    <div className="relative aspect-[2/3] overflow-hidden ">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/abstract-movie-poster.png"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="mt-2 space-y-1">
                      <h3 className="font-semibold text-sm line-clamp-2 ">
                        {movie.title}
                      </h3>
                      {movie.character && (
                        <p className="text-xs text-gray-400 line-clamp-1">
                          as {movie.character}
                        </p>
                      )}
                      {movie.release_date && (
                        <p className="text-xs text-gray-500">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorPage;
