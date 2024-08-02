export type PieceType = 'one' | 'two' | 'three' | 'four' | 'square' | 'corner' | 'T' | 'L' | 'Z';

export type Shape = {
  [key in PieceType]: {
    pieceType: PieceType;
    pattern: number[][];
    color: string;
  };
};

export type PieceRecord = {
  isGameActive: boolean;
  location: Coordinates | null;
  pieceType: PieceType;
  pattern: number[][];
};

export type PlacedPieceRecord = Omit<PieceRecord, 'location' | 'isGameActive'> & {
  location: Coordinates[];
};

export type SquareHighlight = { coords: Coordinates; valid: boolean };

export type Coordinates = number[];

export type GameStatus = 'ready' | 'active' | 'completed';
