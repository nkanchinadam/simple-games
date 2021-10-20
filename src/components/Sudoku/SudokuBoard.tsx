import React from 'react';
import '../../index.css';
import { GREEN, ORANGE, WHITE } from '../colors';
import Square from '../Square';
import { SudokuPiece } from '../types';

interface SudokuBoardProps {
  squares: SudokuPiece[][],
  onClick: (i: number, j: number) => void,
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void,
  win: boolean,
  selectedX?: number,
  selectedY?: number
}

export default function SudokuBoard(props: SudokuBoardProps) {
  const renderSquare = (i: number, j: number): JSX.Element => {
    return <Square
      value={props.squares[i][j]}
      onClick={() => props.onClick(i, j)}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => props.onKeyDown(e)}
      color={props.win ? GREEN : (props.selectedX === i && props.selectedY === j ? ORANGE : WHITE)}
    />
  }

  let rows = Array(9);
  for(let i = 0; i < rows.length; i++) {
    let squares = Array(9);
    for(let j = 0; j < rows.length; j++) {
      squares[j] = renderSquare(i, j);
    }
    rows[i] = <div className="board-row">{squares}</div>;
  }
  return <div>{rows}</div>
}