import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies:null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopratedMovies: (state, action) => {
            state.TopratedMovies = action.payload;
        },
        addUpComingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        }
    }
})
export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopratedMovies, addUpComingMovies } = moviesSlice.actions;
export default moviesSlice.reducer