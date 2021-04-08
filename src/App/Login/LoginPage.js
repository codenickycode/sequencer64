import React from 'react';
import googleImg from 'App/Login/img/google.png';
import twitterImg from 'App/Login/img/twitter.png';
import githubImg from 'App/Login/img/github.png';
import facebookImg from 'App/Login/img/facebook.png';
import { Link } from 'react-router-dom';
import { Button } from 'App/shared/Button';
import { HOST } from 'utils/network';

export const LoginPage = () => {
  const googleLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/google',
      HOST + '/auth/google',
      '_self'
    );
  };

  const twitterLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/twitter',
      HOST + '/auth/twitter',
      '_self'
    );
  };

  const facebookLogin = () => {
    window.open(
      //  'https://drumnickydrum-sequencer.herokuapp.com/auth/facebook',
      HOST + '/auth/facebook',
      '_self'
    );
  };

  const githubLogin = () => {
    window.open(
      // 'https://drumnickydrum-sequencer.herokuapp.com/auth/github',
      HOST + '/auth/github',
      '_self'
    );
  };

  return (
    <div className='loginPage'>
      <h1>Login</h1>
      <div className='loginMethods'>
        <button className='methodBtn' id='login-google' onClick={googleLogin}>
          <img src={googleImg} alt='Google Logo' />
        </button>
        <button className='methodBtn' id='login-twitter' onClick={twitterLogin}>
          <img src={twitterImg} alt='Twitter Logo' />
        </button>
        <button
          className='methodBtn'
          id='login-facebook'
          onClick={facebookLogin}
        >
          <img src={facebookImg} alt='Facebook Logo' />
        </button>
        <button className='methodBtn' id='login-github' onClick={githubLogin}>
          <img src={githubImg} alt='Github Logo' />
        </button>
      </div>
      <div className='bottom-btn show'>
        <Link className='bottomBtn' to='/?load=true'>
          <Button id='goBack'>
            <label htmlFor='goBack'>Go Back</label>
          </Button>
        </Link>
      </div>
    </div>
  );
};
