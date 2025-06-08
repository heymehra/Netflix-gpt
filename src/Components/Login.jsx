import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { userAvatar } from '../utils/Constant';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

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
              const {uid,email,displayName,photoURL} = auth.currentUser;
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
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_medium.jpg" alt="logo" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
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
          className="p-4 my-2 w-full bg-white bg-opacity-10 text-white rounded-md outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
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