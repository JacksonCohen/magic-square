import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import invariant from 'tiny-invariant';
import { SHAPES } from '../data';

import { type Coords } from './square';

export type PieceType = 'one' | 'two' | 'three' | 'four' | 'square' | 'corner' | 'T' | 'L' | 'Z';

export type PieceRecord = {
  location: Coords;
  pieceType: PieceType;
  pattern: number[][];
};

export default function Piece({ location, pieceType, pattern }: PieceRecord) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  // function handleClick() {} // TODO: Add click to rotate (90deg)

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType, pattern }),
      onDragStart: () => {
        preventUnhandled.start();
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType, pattern]);

  return (
    <div ref={ref} className={`${dragging ? 'opacity-50' : 'opacity-100'}`}>
      {pattern.map((row, rowIndex) => (
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
