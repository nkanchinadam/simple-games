import React, { useState } from 'react';
import '../../index.css';
import { SudokuIndex, SudokuPiece } from '../types';
import SudokuBoard from './SudokuBoard';

export default function Sudoku() {
  let emptyGrid: SudokuPiece[][] = Array(9);
  for(let i = 0; i < emptyGrid.length; i++) {
    emptyGrid[i] = Array(9).fill(null);
  }

  let tempRows = Array(9);
  let tempCols = Array(9);
  let tempSections = Array(9);
  for(let i = 0; i < tempRows.length; i++) {
    let tempRow = Array(9);
    let tempCol = Array(9);
    let tempSection = Array(9);
    for(let j = 0; j < tempRows.length; j++) {
      tempRow[j] = i * tempRow.length + j;
      tempCol[j] = j * tempCol.length + i;
      tempSection[j] = (i / 3) * 27 + (i % 3) * 3 + (j / 3) * 9 + (j % 3)
    }
    tempRows[i] = tempRow;
    tempCols[i] = tempCol;
    tempSections[i] = tempSection;
  }

  const [squares, setSquares] = useState<SudokuPiece[][]>(emptyGrid);
  const [rows, setRows] = useState<number[][]>(tempRows);
  const [cols, setCols] = useState<number[][]>(tempCols);
  const [sections, setSections] = useState<number[][]>(tempSections);
  const [selectedX, setSelectedX] = useState<SudokuIndex | null>(null);
  const [selectedY, setSelectedY] = useState<SudokuIndex | null>(null);
  
  const handleClick = (i: SudokuIndex, j: SudokuIndex): void => {
    setSelectedX(i);
    setSelectedY(j);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if(selectedX !== null && selectedY !== null) {
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
      setSquares(squares);
    }
  }

  return <SudokuBoard
    squares={squares}
    onClick={(i: SudokuIndex, j: SudokuIndex) => {handleClick(i, j)}}
    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e)}
    selectedX={selectedX == null ? undefined : selectedX}
    selectedY={selectedY == null ? undefined: selectedY}
  />
}