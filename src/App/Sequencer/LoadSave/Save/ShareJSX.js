import React from 'react';
import { Button } from 'App/shared/Button';
import { TWITTER_URL, FACEBOOK_URL } from 'utils/network';
import { FacebookIcon, TwitterIcon } from 'assets/icons';

export const ShareJSX = ({ online, loggedIn, link, copyLink }) => {
  return (
    <div className='save-sequence-group'>
      <h1 className='save-header'>Share:</h1>
      <div className='share-div'>
        {!online ? (
          <p className='share-p dim-2'>Share unavailable while offline</p>
        ) : !loggedIn ? (
          <p className='share-p dim-2'>Share unavailable until logged in</p>
        ) : !link ? (
          <p className='share-p dim-2'>
            Save your sequence to generate a shareable link
          </p>
        ) : (
          <div className='share-link-wrapper'>
            <div className='share-link'>
              <input
                type='text'
                value={link}
                id='sequence-link'
                readOnly={true}
              />
              <Button id='copy-link' onClick={copyLink}>
                <label htmlFor='copy-link'>copy</label>
              </Button>
            </div>
            <div className='social-links'>
              <a
                href={`${TWITTER_URL}${link}`}
                target='_blank'
                rel='noreferrer'
              >
                <Button classes='social-btn' aria-label='Tweet'>
                  <TwitterIcon />
                  <span>Tweet</span>
                </Button>
              </a>
              <a
                href={`${FACEBOOK_URL}${link}`}
                target='_blank'
                rel='noreferrer'
              >
                <Button classes='social-btn' aria-label='Share to Facebook'>
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
