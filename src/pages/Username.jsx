import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Nav } from '../components/Nav';
import bannerimage from "../img/banner11.jpg";
import { authFirebase } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const Username = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [user] = useAuthState(authFirebase);
  const navigate = useNavigate();

  
  const handleInputChange = (event) => {
    const { value } = event.target;
    setUsername(value);
    validateInput(value);
  };

  const validateInput = (value) => {
    const characterCount = value.length;
    if (characterCount < 4 || characterCount > 20) {
      setErrorMessage('Username must be between 4 and 20 characters.');
      setIsValid(false);
    } else {
      setErrorMessage('');
      setIsValid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid) {
      try {
        // Update the user document in the database with the username field
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);

        await updateDoc(userRef, {
          username: username,
        });

        // Form is valid, redirect to "./"
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='username-page'>
      <Nav />
      <div className="login-page">
        <div className="login-card">
          <div className="left">
            <img src={bannerimage} alt="" />
          </div>
          <div className="right">
            <h1>Start your journey!</h1>
            <p>Choose a username</p>
            <form className='search-form' onSubmit={handleSubmit}>
              <input
                placeholder='Enter your username.'
                value={username}
                onChange={handleInputChange}
              />
              <button
                type='submit'
                className={isValid ? 'button valid' : 'button invalid'}
              >
                Submit
              </button>
            </form>
            {!isValid && <p>- {errorMessage}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Username;
