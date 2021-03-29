const INIT_PATTERN = () => {
  let pattern = [];
  let samples = [];
  for (let i = 0; i < 9; i++) {
    samples.push({
      noteOn: false,
      notes: [{ pitch: 'C2', velocity: 1, length: 1 }],
    });
  }
  for (let i = 0; i < 64; i++) {
    pattern.push(samples);
  }
  return pattern;
};

const pattern = [
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        { pitch: 'C2', velocity: 1, length: 1 },
        { pitch: 'C2', velocity: 1, length: 1 },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        { pitch: 'C2', velocity: 1, length: 1 },
        { pitch: 'C2', velocity: 1, length: 1 },
        { pitch: 'C2', velocity: 1, length: 1 },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
  [
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
  ],
  [
    {
      noteOn: true,
      notes: [
        {
          pitch: 'C2',
          velocity: 1,
          length: 1,
        },
      ],
    },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: true, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
  ],
];

const getEditString = (editedPattern) => {
  const initialPattern = INIT_PATTERN();
  const edits = [];
  editedPattern.forEach((step, i) => {
    const stepEdits = [];
    let stepEdited = false;
    step.forEach((sample, s) => {
      const sampleEdits = [];
      const initialSample = initialPattern[i][s];
      if (sample.noteOn !== initialSample.noteOn) {
        sampleEdits.push(sample.noteOn ? 't' : 'f');
      }
      if (sample.notes[0].pitch !== initialSample.notes[0].pitch) {
        sampleEdits.push('p' + sample.notes[0].pitch);
      }
      if (sample.notes[0].velocity !== initialSample.notes[0].velocity) {
        sampleEdits.push('v' + sample.notes[0].velocity);
      }
      if (sample.notes[0].velocity !== initialSample.notes[0].length) {
        sampleEdits.push('l' + sample.notes[0].length);
      }
      if (sample.notes[1]) {
        sampleEdits.push('n1' + getNoteVals(sample.notes[1]));
      }
      if (sample.notes[2]) {
        sampleEdits.push('n2' + getNoteVals(sample.notes[2]));
      }
      if (sampleEdits.length > 0) {
        stepEdited = true;
        stepEdits.push(`s${s}${sampleEdits.join('')}`);
      }
    });
    if (stepEdited) {
      edits.push(`S${i}${stepEdits.join('')}`);
    }
  });
  const string = edits.join('');
  return string;
};

const getNoteVals = (note) => `${note.pitch}v${note.velocity}l${note.length}`;

// console.log(INIT_PATTERN()[0][0]);
// console.log(pattern[0][0]);
const editString = getEditString(pattern);
console.log(editString);
