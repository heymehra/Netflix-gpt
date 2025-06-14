import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from '../utils/Constant'
import { useEffect } from "react";
const useNowPlayingMovies = () =>{
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store=>store.nowPlayongMovies);
    const getNowPlayingMovies = async()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results))
  }
  useEffect(()=>{
    !nowPlayingMovies && getNowPlayingMovies();
  },[])
}
export default useNowPlayingMovies;