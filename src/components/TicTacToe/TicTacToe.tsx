import React, { useState } from 'react';
import '../../index.css';
import TTTBoard from './TTTBoard';
import { calculateWinner, tieCheck } from './ticTacToeHelpers';
import { TicTacToePiece } from '../types';

export default function TicTacToe() {
  const [history, setHistory] = useState<{squares: TicTacToePiece[]}[]>([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[stepNumber];
    const squares = current.squares.slice();
    if(calculateWinner(squares) != null || squares[i] != null) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat({squares: squares}));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (move: number): void => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((value: {squares: TicTacToePiece[]}, index: number): JSX.Element => {
    const description = index === 0 ? "Go to game start" : "Go to move #" + index;
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  let status;
  if(winner == null && tieCheck(current.squares)) {
    status = "Tied game";
  }
  else if(winner == null) {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }
  else {
    status = "Winner: " + winner;
  }

  return (
    <div className="game">
      <div className="game-board">
        <TTTBoard 
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}