import { type PieceType } from './components/piece';

type Shape = {
  [key in PieceType]: {
    pieceType: PieceType;
    pattern: number[][];
  };
};

export const SHAPES: Shape = {
  one: {
    pieceType: 'one',
    pattern: [[1]],
  },
  two: {
    pieceType: 'two',
    pattern: [[1, 1]],
  },
  three: {
    pieceType: 'three',
    pattern: [[1, 1, 1]],
  },
  four: {
    pieceType: 'four',
    pattern: [[1, 1, 1, 1]],
  },
  square: {
    pieceType: 'square',

    pattern: [
      [1, 1],
      [1, 1],
    ],
  },
  corner: {
    pieceType: 'corner',
    pattern: [
      [1, 1],
      [1, 0],
    ],
  },
  T: {
    pieceType: 'T',
    pattern: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
  L: {
    pieceType: 'L',
    pattern: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  Z: {
    pieceType: 'Z',
    pattern: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  },
};
