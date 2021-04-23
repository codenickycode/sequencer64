import { Button } from 'App/shared/Button';
import { Portal } from 'App/shared/Portal';
import { EmailIcon, GitHubIcon, InstagramIcon } from 'assets/icons';
import { useGoTo } from 'hooks/useGoTo';
import React from 'react';
import { Support } from './Support';

export const InfoPage = () => {
  const goTo = useGoTo();
  const close = (e) => {
    if (e.target.id && e.target.id === 'infoPage') goTo.base();
  };

  return (
    <Portal targetId='fullScreenPortal'>
      <div id='infoPage' className='infoPage' onClick={close}>
        <div className='container'>
          <h1 className='infoTitle'>Sequencer 64</h1>
          <AppInfo />
          <Contact />
          <Support />
        </div>
      </div>
      <div id='closeInfo' className={'bottomBtn'}>
        <Button onClick={goTo.base}>Close</Button>
      </div>
    </Portal>
  );
};

const AppInfo = () => {
  return (
    <section className='appInfo'>
      <h2 className='subHeader'>About</h2>
      <p>
        This app is an experimental music creation tool that runs in the browser and works
        offline. My hope is that it will be enjoyed by both music professionals and untrained
        enthusiasts. If you get lost <em>just tap around!</em>
      </p>
      <p>
        Huge shout-out to Yotam Mann and &nbsp;
        <span className='link'>
          <a href='https://tonejs.github.io/' target='_blank' rel='noreferrer'>
            Tone.js
            <GitHubIcon />
          </a>
        </span>
        &nbsp;for providing a stellar api for working with Web Audio.
      </p>
      <p>
        If you'd like to take a peak behind the scenes you can view my source code on &nbsp;
        <span className='link'>
          <a
            href='https://github.com/drumnickydrum/sequencer64'
            target='_blank'
            rel='noreferrer'
          >
            GitHub
            <GitHubIcon />
          </a>
        </span>
      </p>
    </section>
  );
};

const Contact = () => {
  return (
    <section>
      <h2 className='subHeader'>Contact</h2>
      <p>Feature request? Bug report? Talk code?</p>
      <div className='contactLinks'>
        <span className='link'>
          <a href='mailto:drumnickydrum@gmail.com'>
            Email
            <EmailIcon />
          </a>
        </span>
        <span className='link'>
          <a href='https://www.instagram.com/drumnickydrum/' target='_blank' rel='noreferrer'>
            Instagram
            <InstagramIcon />
          </a>
        </span>
        <span className='link'>
          <a href='https://github.com/drumnickydrum/' target='_blank' rel='noreferrer'>
            GitHub
            <GitHubIcon />
          </a>
        </span>
      </div>
    </section>
  );
};
