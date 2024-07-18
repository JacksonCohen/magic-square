import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import invariant from 'tiny-invariant';
import { type Coords } from './square';
import { SHAPES } from '../data';

export interface PieceProps {
  location: number[][] | null;
  pieceType: PieceType;
  pattern: number[][];
}

export type PieceType = 'one' | 'two' | 'three' | 'four' | 'square' | 'corner' | 'T' | 'L' | 'Z';

export type PieceRecord = {
  type: PieceType;
  location: Coords;
};

// TODO: Add click to rotate (90deg)

export default function Piece({ location, pieceType, pattern }: PieceProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => {
        preventUnhandled.start();
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  return (
    <div ref={ref} className={`${dragging ? 'opacity-50' : 'opacity-100'}`}>
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {row.map((cell, cellIndex) => {
            if (cell === 0) return <div key={cellIndex} className='w-16 h-16'></div>;

            return (
              <div
                key={cellIndex}
                className={`${SHAPES[pieceType].color} w-16 h-16 shadow-inner`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
