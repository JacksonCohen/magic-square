import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useState } from 'react';
import { isLocation, isPieceType, isEqualCoord } from '../utils';
import { SHAPES } from '../data';
import Square from './square';
import Piece from './piece';

import { type PlacedPieceRecord, type Coordinates, type SquareHighlight } from '../types';

const NUMBERS = [1, 2, 3, 4, 5, 6];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface BoardProps {
  isGameActive: boolean;
  pegs: Coordinates[];
  placedPieces: PlacedPieceRecord[];
  handlePiecePlacement: (piece: PlacedPieceRecord) => void;
}

export default function Board({
  isGameActive,
  pegs,
  placedPieces,
  handlePiecePlacement,
}: BoardProps) {
  const [highlightedSquares, setHighlightedSquares] = useState<SquareHighlight[]>([]);
  const [dragOffset, setDragOffset] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

  useEffect(() => {
    return monitorForElements({
      onDragStart({ source, location }) {
        const { clientX: x, clientY: y } = location.initial.input;
        const boundingRect = source.element.getBoundingClientRect();

        const cellSize = 64;
        const rowOffset = Math.floor((y - boundingRect.top) / cellSize);
        const colOffset = Math.floor((x - boundingRect.left) / cellSize);

        setDragOffset({ row: rowOffset, col: colOffset });
      },
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
        const highlightSquares: SquareHighlight[] = [];

        let valid = true;
        for (let row = 0; row < pattern.length; row++) {
          for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === 1) {
              const coord = [
                destinationLocation[0] + row - dragOffset.row,
                destinationLocation[1] + col - dragOffset.col,
              ];

              if (
                coord[0] < 0 ||
                coord[0] >= 6 ||
                coord[1] < 0 ||
                coord[1] >= 6 ||
                placedPieces.some((piece) =>
                  piece.location.some((location) => isEqualCoord(location, coord))
                ) ||
                pegs.some((peg) => isEqualCoord(peg, coord)) // Check if peg is at this location
              ) {
                valid = false;
              }
              highlightSquares.push({ coords: coord, valid });
            }
          }
        }

        setHighlightedSquares(highlightSquares.map((square) => ({ ...square, valid })));
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        const destinationLocation = destination?.data.location;
        const pieceType = source.data.pieceType;

        if (!isLocation(destinationLocation) || !isPieceType(pieceType)) {
          return;
        }

        const pattern = source.data.currentPattern as number[][];
        const pieceLocation = pattern
          .flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (cell === 1) {
                return [
                  destinationLocation[0] + rowIndex - dragOffset.row,
                  destinationLocation[1] + colIndex - dragOffset.col,
                ];
              }

              return [-1, -1]; // Placeholder for non-active parts
            })
          )
          .filter((coord) => {
            return coord?.[0] !== -1 && coord?.[1] !== -1;
          });

        const canPlacePiece = pieceLocation.every((coord) => {
          return (
            coord[0] >= 0 &&
            coord[0] < 6 &&
            coord[1] >= 0 &&
            coord[1] < 6 &&
            !placedPieces.some((piece) =>
              piece.location.some((location) => isEqualCoord(location, coord))
            ) &&
            !pegs.some((peg) => isEqualCoord(peg, coord))
          );
        });

        if (!canPlacePiece) {
          setHighlightedSquares([]);
          return;
        }

        const newPiece = {
          pieceType,
          location: pieceLocation,
          pattern,
        };

        handlePiecePlacement(newPiece);
        setHighlightedSquares([]);
      },
    });
  }, [isGameActive, handlePiecePlacement, placedPieces, dragOffset, pegs]);

  const renderPieces = Object.values(SHAPES).filter(
    (shape) => !placedPieces.some((p) => p.pieceType === shape.pieceType)
  );

  return (
    <div className='flex gap-5'>
      <div className='flex max-w-[525px] gap-3 flex-wrap p-5 border border-gray-200 h-min'>
        {renderPieces.map((shape) => (
          <Piece
            key={shape.pieceType}
            isGameActive={isGameActive}
            location={null}
            pieceType={shape.pieceType}
            pattern={shape.pattern}
          />
        ))}
      </div>

      <div className='flex flex-col items-start'>
        <div className='flex'>
          <div className='w-16 h-16'></div>
          {NUMBERS.map((number) => (
            <div key={number} className='w-16 h-16 flex items-center justify-center select-none'>
              {number}
            </div>
          ))}
        </div>

        <div className='flex'>
          <div>
            {LETTERS.map((letter) => (
              <div key={letter} className='w-16 h-16 flex items-center justify-center select-none'>
                {letter}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-6'>
            {renderGrid(placedPieces, highlightedSquares, pegs)}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderGrid(
  placedPieces: PlacedPieceRecord[],
  highlightedSquares: SquareHighlight[],
  pegs: Coordinates[]
) {
  const squares = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const squareCoord = [row, col];

      const piece = placedPieces.find((piece) => {
        if (piece.location === null) return false;
        return piece.location.some((coord) => isEqualCoord(coord, squareCoord));
      });

      const isPeg = pegs.some((peg) => isEqualCoord(peg, squareCoord));

      squares.push(
        <Square
          key={`${row}-${col}`}
          location={squareCoord}
          highlightedSquares={highlightedSquares}
        >
          {isPeg && <div className='bg-peg w-16 h-16 shadow-inner' />}
          {piece && <div className={`${SHAPES[piece.pieceType].color} w-16 h-16 shadow-inner`} />}
        </Square>
      );
    }
  }
  return squares;
}
