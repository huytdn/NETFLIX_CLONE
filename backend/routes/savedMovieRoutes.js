import express from "express";
import {
  saveMovie,
  getSavedMovies,
  removeMovie,
} from "../controllers/savedMovieController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/savemovie", protect, saveMovie);
router.get("/getsavedmovies", protect, getSavedMovies);
router.delete("/delete/:movieId", protect, removeMovie);

export default router;
