import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { type ReactNode } from 'react';

export type Coordinates = number[];

interface SquareProps {
  location: Coordinates;
  children: ReactNode;
  highlightedSquares: { coords: Coordinates; valid: boolean }[];
}

export default function Square({ location, children, highlightedSquares }: SquareProps) {
  const ref = useRef(null);

  const isHighlighted = highlightedSquares.some(
    (highlight) => highlight.coords[0] === location[0] && highlight.coords[1] === location[1]
  );
  const validHighlight = highlightedSquares.length > 0 ? highlightedSquares[0].valid : true;
  const highlightClass = isHighlighted ? (validHighlight ? ' bg-green-300' : ' bg-red-300') : '';

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
    });
  }, [location]);

  return (
    <div
      className={`flex justify-center items-center w-16 h-16 shadow-inner${highlightClass}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
