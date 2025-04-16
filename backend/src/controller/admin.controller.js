import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
    try {
        if (!file || !file.tempFilePath) {
            throw new Error('Invalid file object');
        }
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
            folder: "spotify-clone"
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error in uploading file to cloudinary:", error);
        throw new Error('Failed to upload file to Cloudinary');
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Both audio and image files are required" });
        }

        const { title, artist, albumId, duration } = req.body;
        if (!title || !artist || !duration) {
            return res.status(400).json({ message: "Title, artist, and duration are required" });
        }

        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Upload files to Cloudinary
        const [audioUrl, imageUrl] = await Promise.all([
            uploadToCloudinary(audioFile),
            uploadToCloudinary(imageFile)
        ]);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration: parseInt(duration),
            albumId: albumId || null
        });

        await song.save();

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }

        res.status(201).json(song);
    } catch (error) {
        console.error("Error in create song:", error);
        res.status(500).json({ 
            message: "Failed to create song",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const deleteSong = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const song = await Song.findById(id);
        if(!song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull: {songs: song._id}
            });
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({message: "Song deleted successfully"});
    } catch (error) {
        console.log("Error in delete song",error)
        next(error);
    }
};

export const createAlbum = async(req, res, next) =>{
    try {
        const {title, artist, releaseYear} = req.body;
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        });

        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.error("Error in create album:", error);
        res.status(500).json({ 
            message: "Failed to create album",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
export const deleteAlbum = async(req, res, next) =>{
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log("Error in delete album",error)
        next(error);
    }
};
export const checkAdmin = async(req,res,next) =>{
    res.status(200).json({admin : true});
}