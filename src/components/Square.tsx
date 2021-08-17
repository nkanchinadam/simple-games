import React from 'react';
import '../index.css';
import { TicTacToePiece, SudokuPiece } from './types';

interface TTTSquareProps {
  value: TicTacToePiece;
  onClick: () => void;
}

interface SudokuSquareProps {
  value: SudokuPiece | null;
  onClick: () => void;
  color: string;
}

export default function Square(props: TTTSquareProps | SudokuSquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={'color' in props ? {backgroundColor: props.color} : {backgroundColor: '#FFFFFF'}}
    >
      {props.value}
    </button>
  );
}