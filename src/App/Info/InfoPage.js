import { Button } from 'App/shared/Button';
import { Portal } from 'App/shared/Portal';
import {
  BTCIcon,
  DAIIcon,
  DogeIcon,
  EmailIcon,
  ETHIcon,
  GitHubIcon,
  InstagramIcon,
  LTCIcon,
  MKRIcon,
  USDCIcon,
  COMPIcon,
  AAVEIcon,
} from 'assets/icons';
import { useGoTo } from 'hooks/useGoTo';
import React, { useEffect, useState } from 'react';

const Coin = React.lazy(() => import('./Coin'));

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
          <section className='appInfo'>
            <h2 className='subHeader'>About</h2>
            <p>
              This app is an experimental music creation tool that runs in the browser and
              works offline. My hope is that it will be enjoyed by both music professionals
              and untrained enthusiasts. If you get lost <em>just tap around!</em>
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
              If you'd like to take a peak behind the scenes you can view my source code on
              &nbsp;
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
                <a
                  href='https://www.instagram.com/drumnickydrum/'
                  target='_blank'
                  rel='noreferrer'
                >
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
          <Support />
        </div>
      </div>
      <div id='closeInfo' className={'bottomBtn'}>
        <Button onClick={goTo.base}>Close</Button>
      </div>
    </Portal>
  );
};

const Support = () => {
  const [expand, setExpand] = useState(false);

  const donateClass = expand ? 'link donate d-none' : 'link donate';
  return (
    <section className='support'>
      <h2 className='subHeader'>Support</h2>
      <p>Would you like to support this and other interesting software ventures of mine?</p>
      <div className={donateClass}>
        <div className='crypto' onClick={() => setExpand(true)}>
          <BTCIcon />
          Donate some crypto!
          <ETHIcon />
        </div>
      </div>
      <CryptoLinks expand={expand} />
    </section>
  );
};

const CryptoLinks = ({ expand }) => {
  const containerClass = expand ? 'cryptoLinks' : 'cryptoLinks d-none';
  const [coin, setCoin] = useState('');
  useEffect(() => {
    const closeInfo = document.getElementById('closeInfo');
    if (!closeInfo) return;
    if (coin) closeInfo.style.display = 'none';
    if (!coin) closeInfo.style.display = 'flex';
  }, [coin]);

  const closeCoin = () => setCoin('');

  return (
    <>
      <div className={containerClass}>
        <CryptoBtn coin='bitcoin' Icon={BTCIcon} onClick={() => setCoin('bitcoin')} />
        <CryptoBtn coin='ether' Icon={ETHIcon} onClick={() => setCoin('ether')} />
        <CryptoBtn coin='doge' Icon={DogeIcon} onClick={() => setCoin('doge')} />
        <CryptoBtn coin='litecoin' Icon={LTCIcon} onClick={() => setCoin('litecoin')} />
        <CryptoBtn
          coin='bitcoin cash'
          Icon={BTCIcon}
          onClick={() => setCoin('bitcoin cash')}
        />
        <CryptoBtn coin='USDC' Icon={USDCIcon} onClick={() => setCoin('USDC')} />
        <CryptoBtn coin='DAI' Icon={DAIIcon} onClick={() => setCoin('DAI')} />
        <CryptoBtn coin='MKR' Icon={MKRIcon} onClick={() => setCoin('MKR')} />
        <CryptoBtn coin='compound' Icon={COMPIcon} onClick={() => setCoin('compound')} />
        <CryptoBtn coin='aave' Icon={AAVEIcon} onClick={() => setCoin('AAVE')} />
        <br />
        ... or @drumnickydrum on &nbsp;
        <span className='link'>
          <a
            href='http://wallet.coinbase.com/'
            target='_blank'
            rel='noreferrer'
            className='crypto'
          >
            coinbase
          </a>
        </span>
      </div>
      <React.Suspense fallback={<CoinFallback coin={coin} closeCoin={closeCoin} />}>
        <Coin coin={coin} closeCoin={closeCoin} />
      </React.Suspense>
    </>
  );
};

const CryptoBtn = ({ coin, Icon, onClick }) => {
  return (
    <div className='link' onClick={onClick}>
      <div className='crypto'>
        {coin} <Icon />
      </div>
    </div>
  );
};

const CoinFallback = ({ coin, closeCoin }) => {
  const close = (e) => {
    if (e.target.id && e.target.id === 'coin') closeCoin();
  };
  return (
    <div id='coin' className='coin' onClick={close}>
      <div className='coinContainer'>
        <h1 className='coinName'>{coin}</h1>
        <div className='coinDummy' />
      </div>
    </div>
  );
};
