import { type ReactNode, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type PieceType } from './piece';
import { canMove, getColor, isCoord, isEqualCoord, isPieceType } from '../utils';

export type Coords = number[][];

type PieceRecord = {
  type: PieceType;
  location: Coords;
};

interface SquareProps {
  pieces: PieceRecord[];
  location: Coords;
  children: ReactNode;
}

export type HoveredState = 'idle' | 'validMove' | 'invalidMove';

export default function Square({ pieces, location, children }: SquareProps) {
  const ref = useRef(null);
  const [state, setState] = useState<HoveredState>('idle');

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        if (!isCoord(source.data.location)) {
          return false;
        }

        return !isEqualCoord(source.data.location, location);
      },
      onDragEnter: ({ source }) => {
        if (!isCoord(source.data.location) || !isPieceType(source.data.pieceType)) {
          return;
        }

        if (canMove(source.data.location, location, source.data.pieceType, pieces)) {
          setState('validMove');
        } else {
          setState('invalidMove');
        }
      },
      onDragLeave: () => setState('idle'),
      onDrop: () => setState('idle'),
    });
  }, [location, pieces]);

  return (
    <div
      className='flex justify-center items-center w-16 h-16 shadow-inner'
      style={{ backgroundColor: getColor(state) }}
      ref={ref}
    >
      {children}
    </div>
  );
}
