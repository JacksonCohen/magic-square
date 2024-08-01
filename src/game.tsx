import { useState } from 'react';
import Board from './components/board';
import Timer from './components/timer';
import { rollDice } from './utils';
import './index.css';

export type GameStatus = 'ready' | 'active' | 'completed';

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pegs, setPegs] = useState<number[][]>([]);

  const handleStartGame = () => {
    const pegCoordinates = rollDice();

    setStartTime(Date.now());
    setGameStatus('active');
    setPegs(pegCoordinates);
  };

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
        ) : (
          <div className='h-14' />
        )}
      </div>

      <Board gameStatus={gameStatus} pegs={pegs} />
    </div>
  );
}
