import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import invariant from 'tiny-invariant';
import { SHAPES } from '../data';

import { type MouseEvent } from 'react';
import { type PieceRecord } from '../types';

export default function Piece({ isGameActive, location, pieceType, pattern }: PieceRecord) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(pattern);

  function handleRotate() {
    if (isGameActive === false) return;

    const numRows = currentPattern.length;
    const numCols = currentPattern[0].length;
    const rotatedPattern = Array.from({ length: numCols }, () => Array(numRows).fill(0));

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        rotatedPattern[col][numRows - 1 - row] = currentPattern[row][col];
      }
    }

    setCurrentPattern(rotatedPattern);
  }

  function handleFlip(event: MouseEvent<HTMLDivElement>) {
    if (isGameActive === false) return;

    event.preventDefault();

    const flippedPattern = currentPattern.map((row) => row.reverse());

    setCurrentPattern(flippedPattern);
  }

  useEffect(() => {
    if (isGameActive === false) return;

    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType, currentPattern }),
      onDragStart: () => {
        preventUnhandled.start();
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [isGameActive, location, pieceType, currentPattern]);

  return (
    <div
      ref={ref}
      className={`${dragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={handleRotate}
      onContextMenu={handleFlip}
    >
      {currentPattern.map((row, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {row.map((cell, cellIndex) => {
            if (cell === 0) return <div key={cellIndex} className='w-16 h-16' />;

            return (
              <div
                key={cellIndex}
                className={`${SHAPES[pieceType].color} w-16 h-16 shadow-inner`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
