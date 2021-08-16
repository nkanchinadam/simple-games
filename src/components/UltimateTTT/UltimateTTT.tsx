import React, { useState } from 'react';
import '../index.css';
import UltimateBoard from './UltimateBoard';
import { TicTacToePiece, calculateWinner, tieCheck } from '../TicTacToe/ticTacToeHelpers';
import { calculateUltimateWinner, createReducedBoard } from './ultimateTTTHelpers';

export default function UltimateTTT() {
  let boards: TicTacToePiece[][] = Array(9);
  for(let i = 0; i < boards.length; i++) {
    boards[i] = Array(9).fill(null);
  }
  const [history, setHistory] = useState<{boards: TicTacToePiece[][], nextBoard: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null}[]>([{boards: boards, nextBoard: null}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number, j: number): void => {

  }

  const jumpTo(move: number) {

  }

  
}

export class UltimateTTT extends React.Component<{}, UltimateTTTState> {

  handleClick(i: number, j: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const boards = Array(9);
    for(let i = 0; i < boards.length; i++) {
      boards[i] = current.boards[i].slice();
    }
    if(boards[i][j] != null || calculateUltimateWinner(boards) != null || (current.nextBoard != null && current.nextBoard !== i) || (current.nextBoard == null && calculateWinner(boards[i]) != null)) {
      return;
    }
    boards[i][j] = this.state.xIsNext ? 'X' : 'O';
    let nextBoard = null;
    if(calculateWinner(boards[j]) == null) {
      nextBoard = j;
    }
    this.setState({
      history: history.concat([{
        boards: boards,
        nextBoard: nextBoard
      }]),
      stepNumber: this.state.stepNumber + 1,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(move: number) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateUltimateWinner(current.boards);

    let status;
    if(winner == null && tieCheck(createReducedBoard(current.boards))) {
      status = "Tied game";
    }
    else if(winner == null) {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }
    else {
      status = "Winner: " + winner;
    }

    let boardDisplayDiv;
    if(winner == null) {
      let boardDisplay = "Any";
      if(current.nextBoard != null) {
        boardDisplay = ["Top Left", "Top Middle", "Top Right", "Middle Left", "Center", "Middle Right", "Bottom Left", "Bottom Middle", "Bottom Right"][current.nextBoard];
      }
      boardDisplay = "Next board: " + boardDisplay;
      boardDisplayDiv = (<div>{boardDisplay}</div>);
    }

    let moves = history.map((boards: ('X' | 'O' | null)[][], move: number) => {
      const description = move === 0 ? "Go to game start" : "Go to move #" + move;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game-board">
          <UltimateBoard
            boards={current.boards}
            onClick={(i: number, j: number) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {boardDisplayDiv}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}