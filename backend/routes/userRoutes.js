import express from "express";
import {
  signup,
  login,
  fetchUser,
  logout,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/fetch-user", protect, fetchUser);
router.post("/logout", logout);

export default router;
