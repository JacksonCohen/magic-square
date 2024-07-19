import { useEffect, useState } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isLocation, isEqualCoord, isPieceType } from '../utils';
import { SHAPES } from '../data';
import Piece from './piece';
import Square from './square';

import { type ReactElement } from 'react';
import { type PieceType, type PieceRecord } from './piece';
import { type Coords } from './square';

const NUMBERS = [1, 2, 3, 4, 5, 6];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Board() {
  const [placedPieces, setPlacedPieces] = useState<PieceRecord[]>([]);
  const [highlightedSquares, setHighlightedSquares] = useState<
    { coords: Coords; valid: boolean }[]
  >([]);

  useEffect(() => {
    return monitorForElements({
      onDrag({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          setHighlightedSquares([]);
          return;
        }

        const destinationLocation = destination.data.location;
        const pieceType = source.data.pieceType;

        if (
          !isLocation(destinationLocation) ||
          !isPieceType(pieceType) ||
          destinationLocation === null
        ) {
          setHighlightedSquares([]);
          return;
        }

        const pattern = source.data.currentPattern as number[][];
        const highlightSquares: { coords: Coords; valid: boolean }[] = [];

        let valid = true;
        for (let row = 0; row < pattern.length; row++) {
          for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === 1) {
              const coord = [[destinationLocation[0][0] + row, destinationLocation[0][1] + col]];

              if (
                coord[0][0] < 0 ||
                coord[0][0] >= 6 ||
                coord[0][1] < 0 ||
                coord[0][1] >= 6
                // placedPieces.some((piece) => isEqualCoord(piece.location, coord))
              ) {
                valid = false;
              }
              highlightSquares.push({ coords: coord, valid });
            }
          }
        }

        setHighlightedSquares(highlightSquares.map((square) => ({ ...square, valid })));
      },
      onDrop: () => setHighlightedSquares([]),
    });
  }, [placedPieces]);

  return (
    <div className='flex gap-5'>
      <div className='flex max-w-[525px] gap-3 flex-wrap p-5 border border-gray-200 h-min'>
        {Object.values(SHAPES).map((shape) => {
          return (
            <Piece
              key={shape.pieceType}
              location={null}
              pieceType={shape.pieceType}
              pattern={shape.pattern}
            />
          );
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

          <div className='grid grid-cols-6'>{renderGrid(placedPieces, highlightedSquares)}</div>
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

function renderGrid(
  placedPieces: PieceRecord[],
  highlightedSquares: { coords: Coords; valid: boolean }[]
) {
  const squares = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const squareCoord = [[row, col]];

      const piece = placedPieces.find((piece) => isEqualCoord(piece.location, squareCoord));

      squares.push(
        <Square
          key={`${row}-${col}`}
          placedPieces={placedPieces}
          location={squareCoord}
          highlightedSquares={highlightedSquares}
        >
          {piece && pieceLookup[piece.pieceType](squareCoord)}
        </Square>
      );
    }
  }
  return squares;
}
