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

  getPopularActor: async () => {
    try {
      const res = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Error fetching popular person:", err);
      return [];
    }
  },

  fetchUpcomingMovie: async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Error fetching movie upcoming:", err);
      return [];
    }
  },

  getPersonDetails: async (id) => {
    try {
      const [personRes, creditsRes] = await Promise.all([
        fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`),
        fetch(
          `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
        ),
      ]);

      const personData = await personRes.json();
      const creditsData = await creditsRes.json();

      return {
        person: personData,
        credits: creditsData,
      };
    } catch (err) {
      console.error("Error fetching person details:", err);
      return null;
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

  searchActor: async (query) => {
    if (!query?.trim()) return [];
    try {
      const res = await fetch(
        `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Error searching person:", err);
      return [];
    }
  },
};

export default GlobalApi;
