import { type ReactElement, useEffect, useState } from 'react';
import Piece, { type PieceType, type PieceRecord } from './piece';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { canMove, isLocation, isEqualCoord, isPieceType } from '../utils';
import { SHAPES } from '../data';
import Square, { type Coords } from './square';

const NUMBERS = [1, 2, 3, 4, 5, 6];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Board() {
  const [pieces, setPieces] = useState<PieceRecord[]>([]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          return;
        }

        const destinationLocation = destination.data.location;
        const sourceLocation = source.data.location;
        const pieceType = source.data.pieceType;

        if (
          !isLocation(destinationLocation) ||
          !isLocation(sourceLocation) ||
          !isPieceType(pieceType)
        ) {
          return;
        }

        const piece = pieces.find((p) => isEqualCoord(p.location, sourceLocation));
        const restOfPieces = pieces.filter((p) => p !== piece);

        if (
          canMove(sourceLocation, destinationLocation, pieceType, pieces) &&
          piece !== undefined
        ) {
          setPieces([{ type: piece.type, location: destinationLocation }, ...restOfPieces]);
        }
      },
    });
  }, [pieces]);

  return (
    <div className='flex gap-5'>
      <div className='flex max-w-[525px] gap-3 flex-wrap p-5 border border-gray-200'>
        {Object.values(SHAPES).map((shape) => {
          return <Piece location={null} pieceType={shape.pieceType} pattern={shape.pattern} />;
        })}
      </div>

      <div className='flex flex-col items-start'>
        <div className='flex'>
          <div className='w-16 h-16'></div>
          {NUMBERS.map((number) => (
            <div key={number} className='w-16 h-16 flex items-center justify-center'>
              {number}
            </div>
          ))}
        </div>

        <div className='flex'>
          <div>
            {LETTERS.map((letter) => (
              <div key={letter} className='w-16 h-16 flex items-center justify-center'>
                {letter}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-6'>{renderGrid(pieces)}</div>
        </div>
      </div>
    </div>
  );
}

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

function renderGrid(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
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
