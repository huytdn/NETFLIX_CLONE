import { useEffect, useState } from "react";
import { getSavedMovies, removeMovie } from "../services/movieServices";
import icons from "../assets/icons/icon";
import { Card, CardContent } from "../components/UI/card";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const { IoCloseCircleOutline, IoBookmarkOutline, FiFilm } = icons;

const WatchlistPage = () => {
  const [movies, setMovies] = useState([]);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  // Fetch list film
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSavedMovies();
      if (data) setMovies(data);
    };
    fetchData();
  }, []);

  // delete film
  const handleRemove = async (movieId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this movie from your watchlist?"
    );
    if (!confirmed) return;

    await removeMovie(movieId);
    setMovies((prev) => prev.filter((movie) => movie.movieId !== movieId));
    toast.success("Delete film successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoBookmarkOutline className="w-10 h-10 text-red-400" />
            <h1 className="text-5xl font-bold text-white">My Watchlist</h1>
          </div>
          <p className="text-red-200 text-lg">
            Review and manage your saved movies.{" "}
          </p>
        </div>

        {/* list save film */}
        {movies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-red-200/70 text-xl">
              Chưa có phim nào được lưu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Card
                key={movie.movieId}
                className="group overflow-hidden bg-white/5 border-red-400/20 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <CardContent className="p-0">
                  <Link to={`/movie/${movie.movieId}`}>
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {movie.posterPath ? (
                        <img
                          src={`${IMAGE_BASE_URL}${movie.posterPath}`}
                          alt={movie.title || movie.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-900 to-slate-900 flex items-center justify-center">
                          <FiFilm className="w-16 h-16 text-red-400/30" />
                        </div>
                      )}

                      {/* close icon hover */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(movie.movieId);
                        }}
                        className="absolute top-0 right-0 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <IoCloseCircleOutline size={32} />
                      </button>

                      {/* badge */}
                      <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white uppercase">
                        {movie.media_type || "movie"}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base line-clamp-2 mb-2">
                        {movie.title || movie.name}
                      </h3>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
