import React from 'react';
import '../../index.css';
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
      color={props.win ? '#00FF00' : (props.selectedX === i && props.selectedY === j ? '#FFA500' : '#FFFFFF')}
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