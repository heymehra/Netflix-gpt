import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/Constant'
import { addUpComingMovies } from '../utils/moviesSlice'
import { useDispatch } from 'react-redux'

const useUpComingMovies = () => {
    const dispatch = useDispatch();
 const getUpComing = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',API_OPTIONS)
    const json = await data.json();
    dispatch(addUpComingMovies(json.results))
 }
 useEffect(()=>{
    getUpComing();
 },[])

}
export default useUpComingMovies;

