import React from 'react';
import ReactDOM from 'react-dom';
import googleImg from 'App/Login/img/google.png';
import twitterImg from 'App/Login/img/twitter.png';
import githubImg from 'App/Login/img/github.png';
import facebookImg from 'App/Login/img/facebook.png';
import { Button } from 'App/shared/Button';
import { HOST } from 'utils/network';
import { useHistory } from 'react-router';

export const LoginPage = () => {
  const history = useHistory();

  const googleLogin = () => {
    window.open(HOST + '/auth/google', '_self');
  };

  const twitterLogin = () => {
    window.open(HOST + '/auth/twitter', '_self');
  };

  const facebookLogin = () => {
    window.open(HOST + '/auth/facebook', '_self');
  };

  const githubLogin = () => {
    window.open(HOST + '/auth/github', '_self');
  };

  const handleGoBack = (e) => {
    if (!e.target.id) return;
    if (e.target.id === 'loginPage' || e.target.id === 'goBack')
      history.goBack();
  };
  const portal = document.getElementById('fullScreenPortal');
  return !portal
    ? null
    : ReactDOM.createPortal(
        <div id='loginPage' className='loginPage' onClick={handleGoBack}>
          <h1>Login to save and share your sequences</h1>
          <div className='loginMethods'>
            <button
              className='methodBtn'
              id='login-google'
              onClick={googleLogin}
            >
              <img src={googleImg} alt='Google Logo' />
            </button>
            <button
              className='methodBtn'
              id='login-twitter'
              onClick={twitterLogin}
            >
              <img src={twitterImg} alt='Twitter Logo' />
            </button>
            <button
              className='methodBtn'
              id='login-facebook'
              onClick={facebookLogin}
            >
              <img src={facebookImg} alt='Facebook Logo' />
            </button>
            <button
              className='methodBtn'
              id='login-github'
              onClick={githubLogin}
            >
              <img src={githubImg} alt='Github Logo' />
            </button>
          </div>
          <div className='bottom-btn show'>
            <div className='bottomBtn' to='/?load=true'>
              <Button id='goBack' onClick={handleGoBack}>
                <label htmlFor='goBack'>Go Back</label>
              </Button>
            </div>
          </div>
        </div>,
        portal
      );
};
