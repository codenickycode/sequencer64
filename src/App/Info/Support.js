import {
  BTCIcon,
  DAIIcon,
  DogeIcon,
  ETHIcon,
  LTCIcon,
  MKRIcon,
  USDCIcon,
  COMPIcon,
  AAVEIcon,
} from 'assets/icons';
import React, { useEffect, useState } from 'react';

const Coin = React.lazy(() => import('./Coin'));

export const Support = () => {
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
