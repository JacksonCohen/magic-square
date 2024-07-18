import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { type Coords } from './square';

export interface PieceProps {
  location: number[][] | null;
  pieceType: PieceType;
  pattern: number[][];
}

enum PieceBackgroundColor {
  'one' = 'bg-red-100',
  'two' = 'bg-green-100',
  'three' = 'bg-blue-100',
  'four' = 'bg-cyan-100',
  'square' = 'bg-pink-100',
  'corner' = 'bg-emerald-100',
  'T' = 'bg-lime-100',
  'L' = 'bg-purple-100',
  'Z' = 'bg-orange-100',
}

export type PieceType = 'one' | 'two' | 'three' | 'four' | 'square' | 'corner' | 'T' | 'L' | 'Z';

export type PieceRecord = {
  type: PieceType;
  location: Coords;
};

export default function Piece({ location, pieceType, pattern }: PieceProps) {
  console.log({ location, pieceType, pattern });

  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  return (
    <div
      ref={ref}
      className={`${PieceBackgroundColor[pieceType]} ${dragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {pieceType}
    </div>
  );
}
