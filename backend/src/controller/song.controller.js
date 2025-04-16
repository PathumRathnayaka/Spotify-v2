import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        // -1 = Decending = Newest -> oldest
        // 1 = Ascending = Oldest -> newest
        const songs = await Song.find().sort({ createdAt: -1});
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in get all songs", error);
        next(error);
    }
};
export const getFeaturedSong = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:6},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};

export const getMadeForYouSong = async (req, res, next) =>{
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:4},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};
export const getTrendingSong = async (req, res, next) =>{
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:4},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};