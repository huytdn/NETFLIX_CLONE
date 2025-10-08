const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;

const GlobalApi = {
  getTrending: async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Error fetching trending movies:", err);
      return [];
    }
  },

  searchMovies: async (query) => {
    if (!query?.trim()) return [];
    try {
      const res = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Error searching movies:", err);
      return [];
    }
  },
};

export default GlobalApi;
