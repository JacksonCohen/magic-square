import { useState } from 'react';
import Board from './components/board';
import Timer from './components/timer';
import { isEqualCoord, rollDice } from './utils';
import './index.css';

import { type GameStatus, type PlacedPieceRecord } from './types';
import { SHAPES } from './data';

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pegs, setPegs] = useState<number[][]>([]);
  const [placedPieces, setPlacedPieces] = useState<PlacedPieceRecord[]>([]);

  function handleStartGame() {
    const pegCoordinates = rollDice();

    setStartTime(Date.now());
    setGameStatus('active');
    setPegs(pegCoordinates);
    setPlacedPieces([]); // Reset pieces on start
  }

  function handlePiecePlacement(pieces: PlacedPieceRecord[]) {
    setPlacedPieces(pieces);

    // Check if the game is won
    if (
      pieces.length === Object.keys(SHAPES).length &&
      pieces.every((piece) =>
        piece.location.every(
          (coord) =>
            !pegs.some((peg) => isEqualCoord(peg, coord)) &&
            coord[0] >= 0 &&
            coord[0] < 6 &&
            coord[1] >= 0 &&
            coord[1] < 6
        )
      )
    ) {
      setGameStatus('completed');
    }
  }

  function handleResetGame() {
    setGameStatus('ready');
    setStartTime(null);
    setPegs([]);
    setPlacedPieces([]);
  }

  return (
    <div className='flex flex-col m-4 gap-4'>
      <div className='flex justify-around gap-6'>
        <h1 className='font-mono text-4xl'>Magic Squares</h1>
        <Timer startTime={startTime} />
      </div>

      <div className='flex justify-center'>
        {gameStatus === 'ready' ? (
          <button
            onClick={handleStartGame}
            className='max-w-32 mt-4 p-2 bg-blue-500 text-white rounded'
          >
            Start Game
          </button>
        ) : gameStatus === 'completed' ? (
          <div className='flex flex-col items-center'>
            <p className='font-mono text-2xl text-green-500'>Congratulations! You've won!</p>
            <p className='font-mono text-xl'>
              Your time: <Timer startTime={startTime} />
            </p>
            <button onClick={handleResetGame} className='mt-4 p-2 bg-blue-500 text-white rounded'>
              Play Again
            </button>
          </div>
        ) : (
          <div className='h-14' />
        )}
      </div>

      <Board
        gameStatus={gameStatus}
        pegs={pegs}
        placedPieces={placedPieces}
        handlePiecePlacement={handlePiecePlacement}
      />
    </div>
  );
}
