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

export function canMove(pattern: Coords, destination: Coords, placedPieces: PieceRecord[]) {
  return false;
}

export function getBackgroundColor(state: HoveredState): string {
  if (state === 'validMove') {
    return 'bg-green-300';
  } else if (state === 'invalidMove') {
    return 'bg-red-300';
  }
  return 'white';
}
