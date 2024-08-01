import { type PieceType } from './components/piece';

type Shape = {
  [key in PieceType]: {
    pieceType: PieceType;
    pattern: number[][];
    color: string;
  };
};

export const SHAPES: Shape = {
  one: {
    pieceType: 'one',
    pattern: [[1]],
    color: 'bg-red-100',
  },
  two: {
    pieceType: 'two',
    pattern: [[1, 1]],
    color: 'bg-green-100',
  },
  three: {
    pieceType: 'three',
    pattern: [[1, 1, 1]],
    color: 'bg-blue-100',
  },
  four: {
    pieceType: 'four',
    pattern: [[1, 1, 1, 1]],
    color: 'bg-cyan-100',
  },
  square: {
    pieceType: 'square',

    pattern: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-pink-100',
  },
  corner: {
    pieceType: 'corner',
    pattern: [
      [1, 1],
      [1, 0],
    ],
    color: 'bg-emerald-100',
  },
  T: {
    pieceType: 'T',
    pattern: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    color: 'bg-lime-100',
  },
  L: {
    pieceType: 'L',
    pattern: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: 'bg-purple-100',
  },
  Z: {
    pieceType: 'Z',
    pattern: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    color: 'bg-orange-100',
  },
};

// zero indexed
export const DICE_COORDINATES = {
  dieOne: [
    [0, 5],
    [5, 0],
  ],
  dieTwo: [
    [4, 0],
    [5, 1],
    [0, 4],
    [1, 5],
  ],
  dieThree: [
    [0, 0],
    [2, 0],
    [3, 0],
    [3, 1],
    [4, 1],
    [5, 2],
  ],
  dieFour: [
    [0, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 5],
    [5, 5],
  ],
  dieFive: [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ],
  dieSix: [
    [3, 4],
    [4, 3],
    [4, 4],
    [4, 5],
    [5, 3],
    [5, 4],
  ],
  dieSeven: [
    [1, 3],
    [2, 2],
    [2, 3],
    [3, 2],
    [3, 3],
    [4, 2],
  ],
};
