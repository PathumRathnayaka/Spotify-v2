import express from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);


export default router;