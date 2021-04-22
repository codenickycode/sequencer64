import React from 'react';
import { Button } from 'App/shared/Button';
import { TWITTER_URL, FACEBOOK_URL } from 'utils/network';
import { FacebookIcon, TwitterIcon } from 'assets/icons';

export const ShareJSX = ({ online, loggedIn, link, copyLink }) => {
  return (
    <div className='share'>
      <h1 className='header'>Share</h1>
      <div className='shareDiv'>
        {!online ? (
          <p>Share unavailable while offline</p>
        ) : !loggedIn ? (
          <p>Share unavailable until logged in</p>
        ) : !link ? (
          <p>Save your sequence to generate a shareable link</p>
        ) : (
          <div>
            <div className='shareLink'>
              <input type='text' value={link} id='sequence-link' readOnly={true} />
              <Button id='copy-link' onClick={copyLink}>
                <label htmlFor='copy-link'>copy</label>
              </Button>
            </div>
            <div className='socialLinks'>
              <a href={`${TWITTER_URL}${link}`} target='_blank' rel='noreferrer'>
                <Button aria-label='Tweet'>
                  <TwitterIcon />
                  <span>Tweet</span>
                </Button>
              </a>
              <a href={`${FACEBOOK_URL}${link}`} target='_blank' rel='noreferrer'>
                <Button aria-label='Share to Facebook'>
                  <FacebookIcon />
                  <span>Share</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
