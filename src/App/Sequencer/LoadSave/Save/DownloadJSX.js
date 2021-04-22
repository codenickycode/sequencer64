import { Button } from 'App/shared/Button';
import { Preparing } from 'App/shared/Preparing/Preparing';
import { formatTime } from 'utils/formatTime';

export const DownloadJSX = ({
  supported,
  cycleCount,
  changeCycleCount,
  duration,
  download,
  preparingDownload,
  timeLeft,
  cancelDownload,
}) => {
  return (
    <div className='download'>
      <h1 className='header'>Download</h1>
      <div className='downloadMain'>
        {!supported ? (
          <p className='notSupported'>Not supported by your browser</p>
        ) : (
          <>
            <div className='countAndDuration'>
              <div className='cycleCount'>
                <label htmlFor='cycleCount'>Cycle Count:</label>
                <Button id='cycleCount' onClick={changeCycleCount}>
                  {cycleCount}
                </Button>
              </div>
              <p className='duration'>
                Duration: <span>{formatTime(duration)}</span>
              </p>
            </div>
            <Button classes='downloadBtn' onClick={download}>
              download
            </Button>
          </>
        )}
      </div>
      {preparingDownload && (
        <Preparing
          addClass='preparingDownload'
          message={`Please wait while your mp3 is prepared.\n Do not close this window until complete.\n\nTime left: ${formatTime(
            timeLeft
          )}`}
          targetId='preparingPortalTop'
          cancel={cancelDownload}
        />
      )}
    </div>
  );
};
