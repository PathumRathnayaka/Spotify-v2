import express from "express";
import { getAllSongs, getFeaturedSong, getMadeForYouSong, getTrendingSong } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSong);
router.get("/made-for-you", getMadeForYouSong);
router.get("/trending", getTrendingSong);

export default router;