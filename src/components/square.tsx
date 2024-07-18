import { type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import Piece, { type PieceType } from './piece';
import { canMove, getColor, isCoord, isEqualCoord, isPieceType } from '../utils';
import { SHAPES } from '../data';

export type Coords = number[][];

type PieceRecord = {
  type: PieceType;
  location: Coords;
};

interface SquareProps {
  pieces: PieceRecord[];
  location: Coords;
  children: ReactNode;
}

export type HoveredState = 'idle' | 'validMove' | 'invalidMove';

const pieceLookup: {
  [Key in PieceType]: (location: number[][]) => ReactElement;
} = {
  one: (location) => (
    <Piece location={location} pieceType={SHAPES.one.pieceType} pattern={SHAPES.one.pattern} />
  ),
  two: (location) => (
    <Piece location={location} pieceType={SHAPES.two.pieceType} pattern={SHAPES.two.pattern} />
  ),
  three: (location) => (
    <Piece location={location} pieceType={SHAPES.three.pieceType} pattern={SHAPES.three.pattern} />
  ),
  four: (location) => (
    <Piece location={location} pieceType={SHAPES.four.pieceType} pattern={SHAPES.four.pattern} />
  ),
  square: (location) => (
    <Piece
      location={location}
      pieceType={SHAPES.square.pieceType}
      pattern={SHAPES.square.pattern}
    />
  ),
  corner: (location) => (
    <Piece
      location={location}
      pieceType={SHAPES.corner.pieceType}
      pattern={SHAPES.corner.pattern}
    />
  ),
  T: (location) => (
    <Piece location={location} pieceType={SHAPES.T.pieceType} pattern={SHAPES.T.pattern} />
  ),
  L: (location) => (
    <Piece location={location} pieceType={SHAPES.L.pieceType} pattern={SHAPES.L.pattern} />
  ),
  Z: (location) => (
    <Piece location={location} pieceType={SHAPES.Z.pieceType} pattern={SHAPES.Z.pattern} />
  ),
};

export function renderGrid(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coords = [[row, col]];

      const piece = pieces.find((piece) => isEqualCoord(piece.location, squareCoord));

      squares.push(
        <Square pieces={pieces} location={squareCoord}>
          {piece && pieceLookup[piece.type](squareCoord)}
        </Square>
      );
    }
  }
  return squares;
}

export default function Square({ pieces, location, children }: SquareProps) {
  const ref = useRef(null);
  const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        if (!isCoord(source.data.location)) {
          return false;
        }

        return !isEqualCoord(source.data.location, location);
      },
      onDragEnter: ({ source }) => {
        if (!isCoord(source.data.location) || !isPieceType(source.data.pieceType)) {
          return;
        }

        if (canMove(source.data.location, location, source.data.pieceType, pieces)) {
          setState('validMove');
        } else {
          setState('invalidMove');
        }
      },
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [location, pieces]);

  // const isDark = (location[0] + location[1]) % 2 === 1;

  return (
    <div
      className='flex justify-center items-center w-full h-full'
      style={{ backgroundColor: getColor(state) }}
      ref={ref}
    >
      {children}
    </div>
  );
}
