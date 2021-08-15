import React from 'react';
import '../index.css';
import { TicTacToePiece } from './TicTacToe/ticTacToeHelpers';

interface TTTSquareProps {
  value: TicTacToePiece;
  onClick: () => void;
}

interface SudokuSquareProps {
  value: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | null;
  onClick: () => void;
}

export default function Square(props: (TTTSquareProps | SudokuSquareProps)) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}