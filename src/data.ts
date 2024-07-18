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
