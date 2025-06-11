import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/Constant';
import { addTrailerVideo } from '../utils/moviesSlice';


const useMovieTrailer = (movieId) => {
   const disptach = useDispatch();
    //fetch trailer video && updating the store with video data;
    const trailerVideo = useSelector(Store=>Store.movies.trailerVideo) //memoization

    const getMovieVideo = async ()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+ '/videos?language=en-US', API_OPTIONS)
        const json  = await data.json();

        const filterData = json.results.filter(video=>video.type=="Trailer")
        const trailer =filterData.length ? filterData[0] : json.results[0]; 
        disptach(addTrailerVideo(trailer))
    }
    useEffect(()=>{
        !trailerVideo && getMovieVideo();
    },[])
}

export default useMovieTrailer