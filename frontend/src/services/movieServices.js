import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${API_URL}/movies`,
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
