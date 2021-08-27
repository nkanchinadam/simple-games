import React, { useState } from 'react';
import '../../index.css';
import { SudokuIndex, SudokuPiece } from '../types';
import SudokuBoard from './SudokuBoard';
import winCheck from './checks';
import generate from './generate';

export default function Sudoku() {
  const [rows, setRows] = useState<number[][]>((): number[][] => {
    let rows: number[][] = Array(9);
    for(let i = 0; i < rows.length; i++) {
      rows[i] = Array(9);
      for(let j = 0; j < rows.length; j++) {
        rows[i][j] = i * rows.length + j;
      }
    }
    return rows;
  });
  const [cols, setCols] = useState<number[][]>((): number[][] => {
    let cols: number[][] = Array(9);
    for(let i = 0; i < cols.length; i++) {
      cols[i] = Array(9);
      for(let j = 0; j < cols.length; j++) {
        cols[i][j] = j * cols.length + i;
      }
    }
    return cols;
  });
  const [sections, setSections] = useState<number[][]>((): number[][] => {
    let sections: number[][] = Array(9);
    for(let i = 0; i < sections.length; i++) {
      sections[i] = Array(9);
      for(let j = 0; j < sections.length; j++) {
        sections[i][j] = Math.floor(i / 3) * 27 + (i % 3) * 3 + Math.floor(j / 3) * 9 + (j % 3)
      }
    }
    return sections;
  });

  const [answer, setAnswer] = useState<SudokuPiece[][]>(generate(50))
  const [squares, setSquares] = useState<SudokuPiece[][]>((): SudokuPiece[][] => {
    let squares: SudokuPiece[][] = Array(9);
    for(let i = 0; i < squares.length; i++) {
      squares[i] = Array(9).fill(null);
    }
    return squares;
  });
  const [selectedX, setSelectedX] = useState<SudokuIndex | null>(null);
  const [selectedY, setSelectedY] = useState<SudokuIndex | null>(null);
  
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