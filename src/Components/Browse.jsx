import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useToprated from '../hooks/useToprated';
import useUpComingMovies from '../hooks/useUpComingMovies'
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import usePopularMovies from '../hooks/usePopularMovies ';
const Browse = () => {
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies()
  useToprated();
  useUpComingMovies();
  return (
    <div>
      <Header/>
      {showGptSearch?(<GptSearch/>) : (<>
      <MainContainer/>
      <SecondaryContainer/>
      </>)}
    </div>
  )
}

export default Browse;