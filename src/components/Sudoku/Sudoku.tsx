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

  const onKeyPress = (e: KeyboardEvent): void => {
    if(!Number.isNaN(e.key) && Number.parseInt(e.key) !== 0) {
      let num = Number.parseInt(e.key);
      if(selectedX !== null && selectedY !== null) {
        if(squares[selectedX][selectedY] === null) {
          squares[selectedX][selectedY] = num as SudokuPiece;
        }
        else if(squares[selectedX][selectedY] === num) {
          squares[selectedX][selectedY] = null;
        }
      }
    }
  }

  return <SudokuBoard
    squares={squares}
    onClick={(i: SudokuIndex, j: SudokuIndex) => {handleClick(i, j)}}
    selectedX={selectedX}
    selectedY={selectedY}
  />
}