import SavedMovie from "../models/savedMovie.model.js";

// save film
export const saveMovie = async (req, res) => {
  try {
    const userId = req.user._id;
    const { movieId, title, posterPath } = req.body;

    const exists = await SavedMovie.findOne({ userId, movieId });
    if (exists) return res.status(400).json({ message: "Movie already saved" });

    const movie = await SavedMovie.create({
      userId,
      movieId,
      title,
      posterPath,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get film
export const getSavedMovies = async (req, res) => {
  try {
    const userId = req.user._id;
    const movies = await SavedMovie.find({ userId });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete film
export const removeMovie = async (req, res) => {
  try {
    const userId = req.user._id;
    const { movieId } = req.params;

    await SavedMovie.findOneAndDelete({ userId, movieId });
    res.json({ message: "Movie removed from list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
