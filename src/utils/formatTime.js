export const formatTime = (time) => {
  const timeInSecs = time / 1000;
  const minutes = parseInt(timeInSecs / 60).toString();
  const seconds = parseInt(timeInSecs % 60).toString();
  const formattedTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return formattedTime;
};
