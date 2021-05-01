import { setStatus } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { CloseIcon } from 'assets/icons';
import { useDispatch } from 'react-redux';
import bch from 'assets/img/crypto/bch.jpg';
import btc from 'assets/img/crypto/bitcoin.jpg';
import doge from 'assets/img/crypto/doge.jpg';
import ether from 'assets/img/crypto/ether.jpg';
import litecoin from 'assets/img/crypto/litecoin.jpg';

export const COIN_SRC = {
  'bitcoin cash': bch,
  bitcoin: btc,
  doge,
  litecoin,
  ether,
  USDC: ether,
  AAVE: ether,
  MKR: ether,
  DAI: ether,
  compound: ether,
};

const Coin = ({ coin, closeCoin }) => {
  const dispatch = useDispatch();

  const close = (e) => {
    if (e.target.id === 'coin' || e.currentTarget.id === 'closeBtn') closeCoin();
  };

  const copyAddress = () => {
    try {
      const copyText = document.getElementById('walletAddress');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');
      dispatch(setStatus('Address copied to clipboard'));
    } catch (e) {
      console.error('copyAddress error -> ', e);
    }
  };

  return !coin ? null : (
    <div id='coin' className='coin' onClick={close}>
      <div className='coinContainer'>
        <Button id='closeBtn' classes='close' onClick={close}>
          <CloseIcon />
        </Button>
        <h1 className='coinName'>Donate {coin}</h1>
        <img src={COIN_SRC[coin]} alt={`${coin} SegWit`} />
        <div className='copyAddress'>
          <input
            type='text'
            id='walletAddress'
            value={COIN_WALLET[coin]}
            className='walletAddress'
            readOnly={true}
          />
          <Button id='copyAddress' onClick={copyAddress}>
            <label htmlFor='copyAddress'>copy</label>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Coin;

const etherWallet = '0x8a18e9a41145bc4efde11cc16d0a6b0f2d00d826';
const COIN_WALLET = {
  bitcoin: 'bc1qfukhqqj4xrltd76kfpjpdcum3gxmnch8k85v4h',
  ether: etherWallet,
  USDC: etherWallet,
  AAVE: etherWallet,
  MKR: etherWallet,
  DAI: etherWallet,
  compound: etherWallet,
  doge: 'DLacphYnWjPLxHiBTysBD2QSSxuENZGYYg',
  litecoin: 'ltc1qr9veykhxv6kmsg6yhhermgtpnc2yeslyxy0fth',
  'bitcoin cash': 'bitcoincash:qpnukzrc25m66kv47pkkum97yhawc0vw3v5u8usufj',
};
