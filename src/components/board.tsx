import { useEffect, useState } from 'react';
import Piece, { type PieceRecord } from './piece';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { canMove, isCoord, isEqualCoord, isPieceType } from '../utils';
import { SHAPES } from '../data';

// const NUMBERS = [1, 2, 3, 4, 5, 6];
// const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

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

        if (!isCoord(destinationLocation) || !isCoord(sourceLocation) || !isPieceType(pieceType)) {
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
      <div className='flex gap-2 p-5 border border-gray-200'>
        {Object.values(SHAPES).map((shape) => {
          return <Piece location={null} pieceType={shape.pieceType} pattern={shape.pattern} />;
        })}
      </div>
    </div>
  );
}

{
  /* <table>
        <thead>
          <tr>
            <th className='w-12 h-12'></th>
            {NUMBERS.map((number) => (
              <th key={number} className='font-normal'>
                {number}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{LETTERS[rowIndex]}</td>
              {row.map((cell, index) => (
                <td
                  key={index}
                  className='w-12 h-12 border-b border-black border-l last:border-r [&:not(:first-child)]:border-t'
                >
                  {cell && (
                    <div
                      className={`w-12 h-12 ${SHAPES[cell].color} flex items-center justify-center`}
                    >
                      {cell}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */
}
