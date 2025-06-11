import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGE } from '../utils/Constant'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      // handle error if needed
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })

    return () => unsubscribe()
  }, [])
const backHome = () => {
  if (showGptSearch) {
    dispatch(toggleGptSearchView()); // hide GPT search
  }
  navigate('/'); // go to home route
};


  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-6 py-4 bg-gradient-to-b from-black z-10 flex flex-col justify-between sm:bg-black md:bg-black md:flex-row">

      <img onClick={backHome} className="w-40 mx-auto md:mx-0 cursor-pointer" src={LOGO} alt="logo" />

      {user && (
        <div className=" flex p-2 justify-between md:flex md:items-center md:space-x-4">
          {showGptSearch && (
            <select
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? 'Homepage' : 'GPT Search'}
          </button>

          <img
            className="hidden md:block w-10 h-10 rounded-full object-cover border-2 border-white"
            src={user?.photoURL}
            alt="user"
          />
          <button
            onClick={handleSignOut}
            className="text-white font-medium hover:scale-105 transition-transform"
          > Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
