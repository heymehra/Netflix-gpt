import React from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { useEffect } from 'react';
import { LOGO } from '../utils/Constant';
const Header = () => {
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleClick = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
      });

  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser(
            {
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            }));
            navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    return ()=> unsubscribe()
  }, [])

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img
        className='w-40'
        src = {LOGO} alt="logo" />
      {user &&
        <div className='flex p-4'>
          <img className='size-12' src={user?.photoURL} alt="logooo" />
          <button onClick={handleClick} className='font-bold text-white'>(Sign Out)</button>
        </div>
      }
    </div>
  )
}

export default Header