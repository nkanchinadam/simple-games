import React from 'react';
import './index.css';
import {Board, calculateWinner, nullCheck} from './board.js';

function createReducedBoard(boards) {
  let reduced = Array(9);
  for(let i = 0; i < reduced.length; i++) {
    reduced[i] = calculateWinner(boards[i]);
  }
  return reduced;
}

function calculateUltimateWinner(boards) {
  let reduced = createReducedBoard(boards)
  return calculateWinner(reduced);
}

class UltimateBoard extends React.Component {
  renderBoard(i) {
    return <Board
      squares={this.props.boards[i]}
      onClick={(j) => this.props.onClick(i, j)}
    />
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderBoard(0)}
          {this.renderBoard(1)}
          {this.renderBoard(2)}
        </div>
        <div className="board-row">
          {this.renderBoard(3)}
          {this.renderBoard(4)}
          {this.renderBoard(5)}
        </div>
        <div className="board-row">
          {this.renderBoard(6)}
          {this.renderBoard(7)}
          {this.renderBoard(8)}
        </div>
      </div>
    );
  }
}

export class UltimateGame extends React.Component {
  constructor(props) {
    super(props);
    let boards = Array(9);
    for(let i = 0; i < boards.length; i++) {
      boards[i] = Array(9).fill(null);
    }
    this.state = {
      history: [{
        boards: boards,
        nextBoard: null
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const boards = Array(9);
    for(let i = 0; i < boards.length; i++) {
      boards[i] = current.boards.slice();
    }

    if(boards[i][j] != null || calculateUltimateWinner(boards) != null || (current.nextBoard != null && current.nextBoard !== i)) {
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

  jumpTo(move) {
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
    if(winner == null && nullCheck(createReducedBoard(current.boards))) {
      status = "Tied game";
    }
    else if(winner == null) {
      let boardLocations = ["top left", "top middle", "top right", "middle left", "center", "middle right", "bottom left", "bottom middle", "bottom right"];
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O') + (current.nextBoard == null ? " on any board" : (" on board " + boardLocations[current.nextBoard]));
    }
    else {
      status = "Winner: " + winner;
    }

    let moves = history.map((boards, move) => {
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
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}