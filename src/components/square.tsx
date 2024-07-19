import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { canMove, getBackgroundColor, isEqualCoord, isLocation, isPieceType } from '../utils';

import { type ReactNode } from 'react';
import { type PieceRecord } from './piece';

export type Coords = number[][] | null;

interface SquareProps {
  placedPieces: PieceRecord[];
  location: Coords;
  children: ReactNode;
  highlightedSquares: number[][];
}

export type HoveredState = 'idle' | 'validMove' | 'invalidMove';

export default function Square({
  placedPieces,
  location,
  children,
  highlightedSquares,
}: SquareProps) {
  const ref = useRef(null);
  const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        // source represents the piece being dragged
        if (!isLocation(location)) {
          return false;
        }

        return !isEqualCoord(source.data.location as Coords, location);
      },
      onDragEnter: ({ source }) => {
        if (!isLocation(location) || !isPieceType(source.data.pieceType)) {
          return;
        }

        if (
          canMove({
            pattern: source.data.currentPattern as number[][],
            destination: location as number[][],
            placedPieces,
          })
        ) {
          setState('validMove');
        } else {
          setState('invalidMove');
        }
      },
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [location, placedPieces]);

  const isHighlighted = highlightedSquares.some(
    ([row, col]) => row === location?.[0][0] && col === location?.[0][1]
  );

  return (
    <div
      className={`flex justify-center items-center w-16 h-16 shadow-inner ${getBackgroundColor(
        state
      )} ${isHighlighted ? 'bg-yellow-200' : ''}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
