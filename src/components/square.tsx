import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { type ReactNode } from 'react';
import { type PieceRecord } from './piece';

export type Coords = number[][] | null;

interface SquareProps {
  placedPieces: PieceRecord[];
  location: Coords;
  children: ReactNode;
  highlightedSquares: { coords: Coords; valid: boolean }[];
}

export type HoveredState = 'idle' | 'validMove' | 'invalidMove';

export default function Square({
  placedPieces,
  location,
  children,
  highlightedSquares,
}: SquareProps) {
  const ref = useRef(null);

  const isHighlighted = highlightedSquares.some(
    (highlight) =>
      highlight.coords?.[0][0] === location?.[0][0] && highlight.coords?.[0][1] === location?.[0][1]
  );
  const validHighlight = highlightedSquares.length > 0 ? highlightedSquares[0].valid : true;
  const highlightClass = isHighlighted ? (validHighlight ? 'bg-green-300' : 'bg-red-300') : '';

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
    });
  }, [location, placedPieces]);

  return (
    <div
      className={`flex justify-center items-center w-16 h-16 shadow-inner ${highlightClass}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
