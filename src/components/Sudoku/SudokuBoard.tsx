import React from 'react';
import '../../index.css';
import Square from '../Square';
import { SudokuPiece, SudokuIndex } from '../types';

interface SudokuBoardProps {
  squares: SudokuPiece[][],
  onClick: (i: SudokuIndex, j: SudokuIndex) => void
}

export default function SudokuBoard(props: SudokuBoardProps) {
  const renderSquare = (i: SudokuIndex, j: SudokuIndex): JSX.Element => {
    return <Square
      value={props.squares[i][j]}
      onClick={() => props.onClick(i, j)}
    />
  }

  let rows = Array(9);
  for(let i = 0; i < rows.length; i++) {
    let squares = Array(9);
    for(let j = 0; j < rows.length; j++) {
      squares[j] = renderSquare(i as SudokuIndex, j as SudokuIndex);
    }
    rows[i] = <div>{squares}</div>;
  }
  return <div>{rows}</div>
}