import React from 'react';
import '../../index.css';
import Square from '../Square';
import { TicTacToePiece, TTTIndex } from '../types';

interface BoardProps {
  squares: TicTacToePiece[];
  onClick: (i: TTTIndex) => void;
}

export default function Board(props: BoardProps) {
  const renderSquare = (i: TTTIndex): JSX.Element => {
    return <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}