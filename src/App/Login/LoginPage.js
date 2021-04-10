import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'App/shared/Button';
import { HOST } from 'utils/network';
import { useHistory } from 'react-router';
import { img } from 'assets/img/social';

export const LoginPage = () => {
  const history = useHistory();
  const [rage, setRage] = useState(false);

  const login = (type) => {
    setRage(true);
    window.open(`${HOST}/auth/${type}`, '_self');
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
            <MethodBtn type='google' login={login} rage={rage} />
            <MethodBtn type='twitter' login={login} rage={rage} />
            <MethodBtn type='facebook' login={login} rage={rage} />
            <MethodBtn type='github' login={login} rage={rage} />
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

const MethodBtn = ({ type, login, rage }) => {
  return (
    <button
      className='methodBtn'
      id={`login-${type}`}
      disabled={rage}
      onClick={() => login(type)}
    >
      <img src={img[type]} alt={`${type} logo`} />
    </button>
  );
};
