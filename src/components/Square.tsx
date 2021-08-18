import React from 'react';
import '../index.css';
import { TicTacToePiece, SudokuPiece } from './types';

interface TTTSquareProps {
  value: TicTacToePiece,
  onClick: () => void
}

interface SudokuSquareProps {
  value: SudokuPiece,
  onClick: () => void,
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void,
  color: string
}

export default function Square(props: TTTSquareProps | SudokuSquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      onKeyDown={'onKeyDown' in props ? ((e: React.KeyboardEvent<HTMLButtonElement>) => props.onKeyDown(e)) : undefined}
      style={'color' in props ? {backgroundColor: props.color} : {backgroundColor: '#FFFFFF'}}
    >
      {props.value}
    </button>
  );
}