export const Analyzer = () => {
  return (
    <div className='analyzer'>
      {/* <p className='overlay'>Select a sample to edit</p> */}
      <div className='freqs'>
        {grid.map((i) => {
          const red = 255 - (i + 1) * 14;
          const blue = i * 14;
          return (
            <div
              key={`freq-${i + 3}`}
              className='freq'
              style={{ backgroundColor: `rgb(${red},0,${blue})`, '--order': i }}
            />
          );
        })}
      </div>
    </div>
  );
};

const grid = [];
for (let i = 0; i < 16; i++) {
  grid.push(i);
}
