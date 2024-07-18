import { type PieceRecord, type PieceType } from '../components/piece';
import { type HoveredState, type Coords } from '../components/square';

export function isLocation(token: unknown): token is Coords {
  return (
    Array.isArray(token) &&
    token.every(
      (innerArray) =>
        Array.isArray(innerArray) && innerArray.every((element) => typeof element === 'number')
    )
  );
}

const pieceTypes: PieceType[] = ['one', 'two', 'three', 'four', 'square', 'corner', 'T', 'L', 'Z'];

export function isPieceType(value: unknown): value is PieceType {
  return typeof value === 'string' && pieceTypes.includes(value as PieceType);
}

export function isEqualCoord(c1: Coords, c2: Coords): boolean {
  if (c1 === null && c2 === null)
    throw new Error('Unexpected Error: Both locations should not be null');

  if (c1 === null || c2 === null) return false;

  return c1[0] === c2[0] && c1[1] === c2[1];
}

export function canMove({
  pattern,
  destination,
  placedPieces,
}: {
  pattern: NonNullable<Coords>;
  destination: NonNullable<Coords>;
  placedPieces: PieceRecord[];
}) {
  const gridSize = 6;

  const [[startRow, startCol]] = destination;

  // Check bounds
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      // if (pattern[row][col] === 1) {
      const newRow = startRow + row;
      const newCol = startCol + col;

      // Check if out of grid bounds
      if (newRow >= gridSize || newCol >= gridSize || newRow < 0 || newCol < 0) {
        return false;
      }

      // Check for collisions with placed pieces
      if (
        placedPieces.some((piece) =>
          piece.location!.some((location) => location[0] === newRow && location[1] === newCol)
        )
      ) {
        return false;
      }
    }
    // }
  }

  // No collisions or out of bounds, return true
  return true;
}

export function getBackgroundColor(state: HoveredState): string {
  if (state === 'validMove') {
    return 'bg-green-300';
  } else if (state === 'invalidMove') {
    return 'bg-red-300';
  }
  return 'white';
}
