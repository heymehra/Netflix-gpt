import React from 'react'
import lang from '../utils/Language'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import client from '../utils/openai'
import {API_OPTIONS} from '../utils/Constant'
import { addGptMovieResult, setLoading } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang)
  const searchText = useRef(null)

  // search movie in TMDB
  const searchMovieTMDB = async(movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',
       API_OPTIONS
      );
      const json = await data.json()
      return json.results

  };
  const handleGptSearchClick = async () => {
    dispatch(setLoading(true));
  const gptQuery  = "Act as a Movie Recommendation system and suggest some movies for the query"+ searchText.current.value+"only give me names of 5 movies with no welcome or other greeting messages just, comma seperated like the example results given ahead. Example Result: Run, Don, Sholay, Golmaal, Krish" 

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a coding assistant that talks like a pirate' },
      { role: 'user', content: gptQuery}
    ],
  });
  if(!response.choices){
    return <h1>not found</h1>
  }
  const gptMovies = response.choices?.[0]?.message?.content.split(",");
  //for each movie i will search TMDB API

  const promiseArray = gptMovies.map(movie=>searchMovieTMDB(movie))
  const tmdbResults = await Promise.all(promiseArray); 

  dispatch(addGptMovieResult({movieNames:gptMovies , movieResults : tmdbResults}))
  dispatch(setLoading(false));
};

 return (
  <div className="pt-[25%] md:pt-[10%] flex justify-center px-4">
    <form
      className="w-full md:w-2/3 lg:w-1/2 max-w-3xl bg-black/70 backdrop-blur-lg rounded-2xl shadow-xl grid grid-cols-12 gap-3 p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={searchText}
        type="text"
        className="col-span-9 p-3 md:p-4 rounded-lg text-black text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-500"
        placeholder={lang[langKey].GptSearchPlaceholder}
      />
      <button
        onClick={handleGptSearchClick}
        className="col-span-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm md:text-base rounded-lg px-4 py-2 transition duration-300"
      >
        {lang[langKey].search}
      </button>
    </form>
  </div>
)

}

export default GptSearchBar
