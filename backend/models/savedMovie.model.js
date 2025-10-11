import mongoose from "mongoose";

const savedMovieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
    },
  },
  { timestamps: true }
);

const SavedMovie = mongoose.model("SavedMovie", savedMovieSchema);
export default SavedMovie;
