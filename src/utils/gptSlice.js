import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    //slice configuration
    name: 'gpt',  //
    initialState: {
        showGptSearch: false,
        gptMovies: null,
        movieResults: null,
        movieNames: null,
        isLoading:false
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        }, //reducer
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
        clearGptMovieResult: (state) => {
            state.movieNames = null;
            state.movieResults = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }

    }
})
//export reducer and action
export const { toggleGptSearchView, addGptMovieResult, clearGptMovieResult,setLoading } = gptSlice.actions;
export default gptSlice.reducer