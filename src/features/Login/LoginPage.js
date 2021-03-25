import React from 'react';
import googleImg from './img/google.png';
import twitterImg from './img/twitter.png';
import githubImg from './img/github.png';
import facebookImg from './img/facebook.png';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const googleLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/google',
      'http://localhost:4000/auth/google',
      '_self'
    );
  };

  const twitterLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/twitter',
      'http://localhost:4000/auth/twitter',
      '_self'
    );
  };

  const facebookLogin = () => {
    window.open(
      //  'https://drumnickydrum-sequencer.herokuapp.com/auth/facebook',
      'http://localhost:4000/auth/facebook',
      '_self'
    );
  };

  const githubLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/github',
      'http://localhost:4000/auth/github',
      '_self'
    );
  };

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <div className={styles.loginMethods}>
        <button
          className={styles.methodBtn}
          id='login-google'
          onClick={googleLogin}
        >
          <img src={googleImg} alt='Google Logo' />
          {/* <p>Login with Google</p> */}
        </button>
        <button
          className={styles.methodBtn}
          id='login-twitter'
          onClick={twitterLogin}
        >
          <img src={twitterImg} alt='Twitter Logo' />
          {/* <p>Login with Twitter</p> */}
        </button>
        <button
          className={styles.methodBtn}
          id='login-facebook'
          onClick={facebookLogin}
        >
          <img src={facebookImg} alt='Facebok Logo' />
          {/* <p>Login with Facebook</p> */}
        </button>
        <button
          className={styles.methodBtn}
          id='login-github'
          onClick={githubLogin}
        >
          <img src={githubImg} alt='Github Logo' />
          {/* <p>Login with Github</p> */}
        </button>
      </div>
      <div className='bottom-btn show'>
        <Link className='load-save-sequence-close' to='/?load=true'>
          Close
        </Link>
      </div>
    </div>
  );
};
