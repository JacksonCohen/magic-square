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

export function canMove(
  start: Coords,
  destination: Coords,
  pieceType: PieceType,
  pieces: PieceRecord[]
) {
  console.log(start);
  // const rowDist = Math.abs(start[0] - destination[0]);
  // const colDist = Math.abs(start[1] - destination[1]);

  // if (pieces.find((piece) => isEqualCoord(piece.location, destination))) {
  //   return false;
  // }

  switch (pieceType) {
    // case 'king':
    // 	return [0, 1].includes(rowDist) && [0, 1].includes(colDist);
    // case 'pawn':
    // 	return colDist === 0 && start[0] - destination[0] === -1;
    default:
      return true; // TODO: swap back to false
  }
}

export function getColor(state: HoveredState): string {
  if (state === 'validMove') {
    return 'lightgreen';
  } else if (state === 'invalidMove') {
    return 'pink';
  }
  return 'white';
}
