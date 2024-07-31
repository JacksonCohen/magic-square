import { useState } from 'react';
import Board from './components/board';
import Timer from './components/timer';
import './index.css';

type GameState = 'ready' | 'active' | 'completed';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleStartGame = () => {
    setGameState('active');
    setStartTime(Date.now());
  };

  return (
    <div className='flex flex-col m-4 gap-4'>
      <div className='flex justify-around gap-6'>
        <h1 className='font-mono text-4xl'>Magic Squares</h1>
        <Timer startTime={startTime} />
      </div>

      {gameState === 'ready' && (
        <button
          onClick={handleStartGame}
          className='max-w-32 mt-4 p-2 bg-blue-500 text-white rounded'
        >
          Start Game
        </button>
      )}

      <Board />
    </div>
  );
}
