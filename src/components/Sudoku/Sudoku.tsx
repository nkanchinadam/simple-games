import React, { useState } from 'react';
import '../../index.css';
import { SudokuIndex, SudokuPiece } from '../types';
import SudokuBoard from './SudokuBoard';

export default function Sudoku() {
  let emptyGrid: SudokuPiece[][] = Array(9);
  for(let i = 0; i < emptyGrid.length; i++) {
    emptyGrid[i] = Array(9).fill(null);
  }
  const [squares, setSquares] = useState<SudokuPiece[][]>(emptyGrid);
  const [selectedX, setSelectedX] = useState<SudokuIndex | null>(null);
  const [selectedY, setSelectedY] = useState<SudokuIndex | null>(null);
  
  const handleClick = (i: SudokuIndex, j: SudokuIndex): void => {
    setSelectedX(i);
    setSelectedY(j);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    let newSquares = Array(9);
    for(let i = 0; i < newSquares.length; i++) {
      newSquares[i] = squares[i].slice();
    }

    let num = Number.parseInt(e.key)
    if(!Number.isNaN(num) && num !== 0) {
      if(selectedX !== null && selectedY !== null) {
        if(newSquares[selectedX][selectedY] === null) {
          newSquares[selectedX][selectedY] = num as SudokuPiece;
        }
        else if(newSquares[selectedX][selectedY] === num) {
          newSquares[selectedX][selectedY] = null;
        }
      }
    }
    console.log(e.key);
    setSquares(newSquares);
  }

  return <SudokuBoard
    squares={squares}
    onClick={(i: SudokuIndex, j: SudokuIndex) => {handleClick(i, j)}}
    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e)}
    selectedX={selectedX}
    selectedY={selectedY}
  />
}