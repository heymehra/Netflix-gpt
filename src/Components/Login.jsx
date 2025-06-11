import React, { useState, useRef,useEffect } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, userAvatar } from '../utils/Constant';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
  if (name.current) name.current.value = '';
  if (email.current) email.current.value = '';
  if (password.current) password.current.value = '';
  setErrorMessage(null);
}, [isSignInForm]);

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value, photoURL: userAvatar
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser(
                  {
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                  })
              )
            })
            .catch((error) => {
              setErrorMessage(errorMessage)
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    }
    else {
      signInWithEmailAndPassword(auth,
        email.current.value,
        password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });

    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)

  }
  return (
    <div>
      <Header />
      <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden   ">
        <img className= "object-cover" src={BG_URL} />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>

        {!isSignInForm &&
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-white bg-opacity-10 text-white rounded-md outline-none"
          />}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          autoComplete='off'
          className="p-4 my-2 w-full bg-white bg-opacity-10 text-white rounded-md outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          autoComplete='off'
          className="p-4 my-2 w-full bg-white bg-opacity-10 text-white rounded-md outline-none"
        />
        <p className='text-red-500 font-bold text-sm py-3'>{errorMessage}</p>
        <button onClick={handleButtonClick}
          className="p-4 my-6 bg-red-600 hover:bg-red-700 w-full rounded-lg font-semibold"
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4'>{isSignInForm ? (<>'New to Netflix ? {''}<span onClick={toggleSignInForm} className='text-white cursor-pointer hover:text-blue-500'>Sing Up Now</span></>) : (<>Allready registered ? {' '}<span onClick={toggleSignInForm} className='text-white cursor-pointer hover:text-blue-500'>Sign In Now</span> </>)}</p>
      </form>
    </div>
  )
}

export default Login