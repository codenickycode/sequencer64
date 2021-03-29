const stepRegexp = /S(\d+)/g;
const sampleRegexp = /s(\d+)/g;
const valsRegexp = /p\w\d|v\d+(?:\.\d+)?|l\d+(?:\.\d+)?/g;
const slicesRegexp = /(n1.*)(n2.*)|n1.*$|n2.*$/;

const INIT_NOTE = () =>
  Object.assign({}, { pitch: 'C2', velocity: 1, length: 1 });

const INIT_SAMPLE = () =>
  Object.assign(
    {},
    {
      noteOn: false,
      notes: [INIT_NOTE()],
    }
  );

const INIT_PATTERN = () => {
  let pattern = [];
  let samples = [];
  for (let i = 0; i < 9; i++) {
    samples.push(INIT_SAMPLE());
  }
  for (let i = 0; i < 64; i++) {
    pattern.push(Object.assign([], samples));
  }
  return Object.assign([], pattern);
};

const pattern = [
  [
    { noteOn: true, notes: [{ pitch: 'C1', velocity: 0.5, length: 0.25 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    { noteOn: false, notes: [{ pitch: 'C2', velocity: 1, length: 1 }] },
    {
      noteOn: true,
      notes: [
        { pitch: 'C1', velocity: 0.5, length: 0.35 },
        { pitch: 'C2', velocity: 1, length: 2 },
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
        sampleEdits.push('n1' + getNoteValsShort(sample.notes[1]));
      }
      if (sample.notes[2]) {
        sampleEdits.push('n2' + getNoteValsShort(sample.notes[2]));
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
  return string || 'init';
};

const getNoteValsShort = (note) =>
  `p${note.pitch}v${note.velocity}l${note.length}`;

const getNoteValsLong = (string) => {
  const noteVals = INIT_NOTE();
  const edits = string.match(valsRegexp);
  if (edits) {
    edits.forEach((edit) => {
      switch (edit[0]) {
        case 'p':
          noteVals.pitch = edit.substr(1);
          break;
        case 'v':
          noteVals.velocity = Number(edit.substr(1));
          break;
        case 'l':
          noteVals.length = Number(edit.substr(1));
          break;
        default:
          break;
      }
    });
  }
  return noteVals;
};

const getVals = (string) => {
  let sample = Object.assign({}, { noteOn: false, notes: [] });
  const slices = string.match(slicesRegexp);
  if (slices) {
    let note1, note2;
    if (slices[1]) {
      note1 = getNoteValsLong(slices[1]);
    } else {
      note1 = getNoteValsLong(slices[0]);
    }
    if (slices[2]) {
      note2 = getNoteValsLong(slices[2]);
    }
    const n = string.indexOf('n');
    const note0String = string.substr(0, n);
    const note0 = getNoteValsLong(note0String);
    sample.notes.push(note0, note1);
    if (note2) sample.notes.push(note2);
  } else {
    const note0 = getNoteValsLong(string);
    sample.notes.push(note0);
  }
  if (string[0] === 't') sample.noteOn = true;
  if (string[0] === 'f') sample.noteOn = false;
  return sample;
};

const getPattern = (editString) => {
  const pattern = INIT_PATTERN();
  if (editString === 'init') return pattern;
  const stepEntries = getEntries(editString, stepRegexp);
  stepEntries.forEach(([step, sampleEditsString]) => {
    const sampleEntries = getEntries(sampleEditsString, sampleRegexp);
    sampleEntries.forEach(([sample, edits]) => {
      pattern[step][sample] = getVals(edits);
    });
  });
  return pattern;
};

const getEntries = (string, regexp) => {
  const array = string.split(regexp);
  const entries = Object.assign([]);
  for (let i = 1, len = array.length; i < len; i += 2) {
    let key = array[i];
    let val = array[i + 1];
    let entry = [key, val];
    entries.push(entry);
  }
  return entries;
};

const editString = getEditString(pattern);
const newPattern = getPattern(editString);
console.log(newPattern);
console.log('ZEROZERO\n', newPattern[0][0]);
console.log('ZEROTHREE\n', newPattern[0][3]);
