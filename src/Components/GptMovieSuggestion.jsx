import React,{useEffect}from 'react'
import { useSelector } from "react-redux"
import MovieList from './MovieList'
import { useDispatch } from 'react-redux'
import { clearGptMovieResult } from '../utils/gptSlice'


const GptMovieSuggestion = () => {
   const dispatch = useDispatch();
  const { movieResults, movieNames,isLoading } = useSelector(store => store.gpt);
  
  
  useEffect(() => {
    // Clear GPT movies when component unmounts
    return () => {
      dispatch(clearGptMovieResult());
    };
  }, []);
  
  if(isLoading){
    return <div className='text-white text-4xl text-center mt-8'>Loading...</div>
  }
  if (!movieNames) return null;
  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-85'>
      <div>
        {movieNames.map((movieNames, index) =>
          <MovieList
            key={movieNames}
            title={movieNames}
            movies={movieResults[index]}
          />
        )}
      </div>
    </div>
  )
}

export default GptMovieSuggestion