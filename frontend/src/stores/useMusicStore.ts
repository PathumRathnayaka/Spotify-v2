import { axiosInstance } from "@/lib/axios";
import {Album, Song, Stats} from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
    songs: Song[]; 
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    madeForYouSongs: Song[];
    featuredSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalAlbums: 0,
        totalSongs: 0,
        totalUsers: 0,
        totalArtists: 0
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set(state => ({
                albums: state.albums.filter(album => album._id !== id),
                songs: state.songs.map(song => 
                    song.albumId === state.albums.find((a) => a._id === id)?.title ? {...song, album: null} : song),
            }));
            toast.success("Album deleted successfully");
        } catch (error: any) {
            set({ error: error.response.data.message });
            toast.error("Failed to delete album"+error.message);
        } finally {
            set({ isLoading: false });
        }
    },
    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);
            set(state => ({
                songs: state.songs.filter(song => song._id !== id),
            }));
            toast.success("Song deleted successfully");
        } catch (error: any) {
            set({ error: error.response.data.message });
            toast.error("Failed to delete song"+error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, error: null });


        try {
            const response = await axiosInstance.get("/songs");
            set({ songs: response.data });
            console.log("check song:",response.data);
            console.log("hello song");
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        console.log("stats start");
        try {
            const response = await axiosInstance.get("/stats");
            console.log("check stats:",response.data);
            console.log("hello stats");
            set({ stats: response.data });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },



    fetchAlbums: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
            console.log("check album:",response.data);
        } catch (error: any) {
            set({ error: error?.response?.data?.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error?.response?.data?.message || "An error occurred" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () =>{
        set({ isLoading: true, error: null});
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally{
            set({ isLoading: false});
        }
    },
    fetchMadeForYouSongs: async () =>{
        set({ isLoading: true, error: null});
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({ madeForYouSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally{
            set({ isLoading: false});
        }
    },
    fetchTrendingSongs: async () =>{
        set({ isLoading: true, error: null});
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({ trendingSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally{
            set({ isLoading: false});
        }
    }
}));
