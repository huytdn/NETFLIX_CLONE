import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api/movies",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// save film
export const saveMovie = async (movie) => {
  try {
    const res = await api.post("/savemovie", {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    });
    return res.data;
  } catch (error) {
    console.error("Error save film:", error.response?.data || error.message);
  }
};

// get film
export const getSavedMovies = async () => {
  try {
    const res = await api.get("/getsavedmovies");
    return res.data.savedMovies || res.data;
  } catch (error) {
    console.error("Error get film:", error.response?.data || error.message);
  }
};

// delete film
export const removeMovie = async (movieId) => {
  try {
    const res = await api.delete(`/delete/${movieId}`);
    return res.data;
  } catch (error) {
    console.error("Error remove film:", error.response?.data || error.message);
  }
};
