import { type PieceType } from '../components/piece';
import { type Coordinates } from '../components/square';

export function isLocation(token: unknown): token is Coordinates {
  return (
    Array.isArray(token) && token.length === 2 && token.every((val) => typeof val === 'number')
  );
}

const pieceTypes: PieceType[] = ['one', 'two', 'three', 'four', 'square', 'corner', 'T', 'L', 'Z'];

export function isPieceType(value: unknown): value is PieceType {
  return typeof value === 'string' && pieceTypes.includes(value as PieceType);
}

export function isEqualCoord(c1: Coordinates, c2: Coordinates): boolean {
  // TODO: Refactor this function
  if (c1 === null && c2 === null)
    throw new Error('Unexpected Error: Both locations cannot be null');

  if (c1 === null || c2 === null) return false;

  return c1[0] === c2[0] && c1[1] === c2[1];
}
