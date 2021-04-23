import { setStatus } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { CloseIcon } from 'assets/icons';
import { useDispatch } from 'react-redux';

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
      console.log(e);
    }
  };

  console.log(coin);
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

const etherSrc =
  'https://lh3.googleusercontent.com/no2Ue38f0sxcV3C7KyOcDSmJdh1F9KaEjzbuOGkrLuyQ6l_64yBbC89ux1NzxRslM4V9zxOSANJFAI7pWKZcY1Ptpg0XI4ocLxqbDq6-E2pTxyqCU2HL1p6yz9UUPv8hqAhMFqS3ySE=w2400';
const COIN_SRC = {
  bitcoin:
    'https://lh3.googleusercontent.com/XTlt2N6-rrejycCL_IcP5l_5oR2Vcn5BtMBWL5fQuHlu7LPWyFeXvKP9wXcS6bAOAkm9iY9tWMuy487s5D-e2PpD-7Ow8zIXeESPjDjE9jpzpogevfmMvQz2wqQgslH6CbajHerNsWY=w2400',
  ether: etherSrc,
  USDC: etherSrc,
  AAVE: etherSrc,
  MKR: etherSrc,
  DAI: etherSrc,
  compound: etherSrc,
  doge:
    'https://lh3.googleusercontent.com/hxsRI2NgdmTYfTe3MTd5n5ra0jTi-toJPbQkVnha5juX6AuwLX8m4Kn106IbUjvD_qxMRuv0XQet6oCuvF49cKkKNiiRh9ksFg91onKPxx-wn73nVjWBKjRAv9uy8lpjBl3TKrFpFAM=w2400',
  litecoin:
    'https://lh3.googleusercontent.com/nCflBga5DUX8dSFs7r-yZltpLvNGtkIGitoFtY2a3XIYFZR1zWMKyvku6FI2nq6gNXC_HZ7vwY5NE873x39TSNJKPZwFq_OU3iaB3RttUFRndC45DTEoBWpD-881Kzpo5AtrX7l39vU=w2400',
  'bitcoin cash':
    'https://lh3.googleusercontent.com/NPytQNBJpar4LCsCPcHMBRtRozinuVLMcjbobZNDF6WFvc_rC1M_NKFOyVF0lz1y3s24wrIM23tx6OBhPb0y2GLCcJE5h8q4uN6joP3dBNPYYtYIC3guwDxBgnup-Jb2XbScAXcDQCU=w2400',
};

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
