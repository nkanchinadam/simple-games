import React, { useState } from 'react';
import '../../index.css';
import { SudokuIndex, SudokuPiece } from '../types';
import SudokuBoard from './SudokuBoard';
import winCheck from './checks';
import generate from './generate';

export default function Sudoku() {
  const [answer, setAnswer] = useState<SudokuPiece[][]>(generate())

  const createPuzzle = (numRemove: number): SudokuPiece[][] => {
    let squares = Array(9);
    for(let i = 0; i < squares.length; i++) {
      squares[i] = answer[i].slice();
    }

    let arr = Array(squares.length * squares.length);
    for(let i = 0; i < squares.length * squares.length; i++) {
      arr[i] = i;
    }
    for(let i = 0; i < numRemove; i++) {
      let index = Math.floor(Math.random() * arr.length);
      squares[Math.floor(arr[index] / squares.length)][arr[index] % squares.length] = null;
      arr.splice(index, 1);
    }
    return squares;
  }

  const [squares, setSquares] = useState<SudokuPiece[][]>((): SudokuPiece[][] => createPuzzle(50));
  const [selectedX, setSelectedX] = useState<SudokuIndex | null>(null);
  const [selectedY, setSelectedY] = useState<SudokuIndex | null>(null);

  const newPuzzle = (numRemove: number): void => {
    setAnswer(generate());
    setSquares(createPuzzle(numRemove));
  }

  const handleClick = (i: SudokuIndex, j: SudokuIndex): void => {
    setSelectedX(i);
    setSelectedY(j);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if(selectedX !== null && selectedY !== null && !winCheck(squares)) {
      let num = Number.parseInt(e.key);
      if(!Number.isNaN(num) && num !== 0) {
        if(squares[selectedX][selectedY] === null) {
          squares[selectedX][selectedY] = num as SudokuPiece;
        }
        else if(squares[selectedX][selectedY] === num) {
          squares[selectedX][selectedY] = null;
        }
      }
      else if(e.key === 'Backspace') {
        squares[selectedX][selectedY] = null;
      }
      setSquares(squares.slice());
    }
  }

  return <SudokuBoard
    squares={squares}
    onClick={(i: SudokuIndex, j: SudokuIndex) => {handleClick(i, j)}}
    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e)}
    win={winCheck(squares)}
    selectedX={selectedX == null ? undefined : selectedX}
    selectedY={selectedY == null ? undefined: selectedY}
  />
}