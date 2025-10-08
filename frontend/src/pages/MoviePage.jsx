import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../assets/icons/icon";
import { Card, CardContent } from "@/components/ui/card";

const { IoIosStar, IoPlayOutline } = icons;
const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTE3MzZkMDg0Y2ZhNGViYTM0MWE5NDJiNzkxYTYwNiIsIm5iZiI6MTc1NTk0Nzk2OC44OTkwMDAyLCJzdWIiOiI2OGE5YTNjMGU4MTYzNjQwYjM3ODE4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eo1yUH8yzK7Jr0gHm1duEpFh_qmx9I4x4YkWXNEKSQA",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovie(res || []))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setRecommendations(res.results) || [])
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailerKey(trailer?.key || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
      <div
        className="relative h-[70vh] flex items-end "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-end p-8 gap-8">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="rounded-lg shadow-lg w-48 hidden md:block"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center">
                <IoIosStar className="text-yellow-400 mb-0.5 mr-1.5" />{" "}
                {movie.vote_average?.toFixed(1)}
              </span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-2xl text-gray-200">{movie.overview}</p>
            <Link
              to={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
            >
              <button className="flex justify-center items-center bg-[#e50914] hover:bg-red-700 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
                <IoPlayOutline className="h-6 w-6 mr-2 md:h-5 md:w-5" />
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-8 ">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-white">Status: </span>
                <span className="ml-2">{movie.status}</span>
              </li>
              <li>
                <span className="font-semibold text-white">Release Date: </span>
                <span className="ml-2">{movie.release_date}</span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Original Language:{" "}
                </span>
                <span className="ml-2">
                  {movie.original_language?.toUpperCase()}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Budget: </span>
                <span className="ml-2">
                  {movie.budget ? `${movie.budget.toLocaleString()}` : `N/A`}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Production Companies:{" "}
                </span>
                <span className="ml-2">
                  {movie.production_companies &&
                  movie.production_companies.length > 0
                    ? movie.production_companies
                        .map((item) => item.name)
                        .join(", ")
                    : `N/A`}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Countries: </span>
                <span className="ml-2">
                  {movie.production_countries &&
                  movie.production_countries.length > 0
                    ? movie.production_countries
                        .map((item) => item.name)
                        .join(", ")
                    : `N/A`}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Spoken Language:{" "}
                </span>
                <span className="ml-2">
                  {movie.spoken_languages && movie.spoken_languages.length > 0
                    ? movie.spoken_languages.map((item) => item.name).join(", ")
                    : `N/A`}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="italic text-gray-400 mb-6">
              {movie.tagline || `No tagline available.`}
            </p>
            <h3 className="font-semibold text-white">Overview</h3>
            <p className="text-gray-200">{movie.overview}</p>
          </div>
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="p-8">
          <h2 className="font-semibold text-white">You might also like ...</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {recommendations.slice(0, 10).map((rec) => (
              <Card
                key={rec.id}
                className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <CardContent>
                  <Link to={`/movie/${rec.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${rec.poster_path}`}
                      className="w-full  object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-sm font-semibold">{rec.title}</h3>
                      <span className="text-xs text-gray-400">
                        {rec.release_date?.slice(0, 4)}
                      </span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
