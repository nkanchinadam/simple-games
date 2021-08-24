import React, { useState } from 'react';
import '../../index.css';
import UltimateBoard from './UltimateBoard';
import { calculateWinner, tieCheck } from '../TicTacToe/ticTacToeHelpers';
import { calculateUltimateWinner, createReducedBoard } from './ultimateTTTHelpers';
import { TicTacToePiece, TTTIndex } from '../types';

export default function UltimateTTT() {
  let boards: TicTacToePiece[][] = Array(9);
  for(let i = 0; i < boards.length; i++) {
    boards[i] = Array(9).fill(null);
  }
  const [history, setHistory] = useState<{boards: TicTacToePiece[][], nextBoard: TTTIndex | null}[]>([{boards: boards, nextBoard: null}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: TTTIndex, j: TTTIndex): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[stepNumber];
    const boards = Array(9);
    for(let i = 0; i < boards.length; i++) {
      boards[i] = current.boards[i].slice();
    }
    if(boards[i][j] != null || calculateUltimateWinner(boards) != null || (current.nextBoard != null && current.nextBoard !== i) || (current.nextBoard == null && calculateWinner(boards[i]) != null)) {
      return;
    }
    boards[i][j] = xIsNext ? 'X' : 'O';
    let nextBoard: TTTIndex | null = null;
    if(calculateWinner(boards[j]) == null) {
      nextBoard = j;
    }
    setHistory(newHistory.concat([{boards: boards, nextBoard: nextBoard}]));
    setStepNumber(stepNumber + 1);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (move: number): void => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  }

  const current = history[stepNumber]
  const winner = calculateUltimateWinner(current.boards);

  let status: string;
  if(winner == null && tieCheck(createReducedBoard(current.boards))) {
    status = "Tied game";
  }
  else if(winner == null) {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }
  else {
    status = "Winner: " + winner;
  }

  let boardDisplay: string = "Any";
  if(current.nextBoard != null) {
    boardDisplay = ["Top Left", "Top Middle", "Top Right", "Middle Left", "Center", "Middle Right", "Bottom Left", "Bottom Middle", "Bottom Right"][current.nextBoard];
  }
  boardDisplay = "Next board: " + boardDisplay;

  let moves = history.map((value: {boards: TicTacToePiece[][], nextBoard: TTTIndex | null}, move: number) => {
    const description = move === 0 ? "Go to game start" : "Go to move #" + move;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <UltimateBoard
          boards={current.boards}
          onClick={(i: TTTIndex, j: TTTIndex) => handleClick(i, j)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {winner || <div>{boardDisplay}</div>}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}