import { useState } from 'react';

const NUMBERS = [1, 2, 3, 4, 5, 6];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Board() {
  const [grid, setGrid] = useState<(string | null)[][]>(new Array(6).fill(new Array(6).fill(null)));

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {NUMBERS.map((number) => (
            <th key={number}>{number}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{LETTERS[rowIndex]}</td>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className='[&:not(:first-child)]:border-t border-b border-black border-l last:border-r w-[20px]'
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
