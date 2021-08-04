import React from 'react';
import './index.css';
import {Board, Game, calculateWinner, nullCheck} from './board.js';

function calculateUltimateWinner(boards) {
  reduced = Array(9);
  for(let i = 0; i < reduced.length; i++) {
    reduced[i] = calculateWinner(boards[i]);
  }
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
    this.state = {
      history: [{
        boards: Array(9).fill(Array(9).fill(null)),
        nextBoard: null
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i, j) {

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateUltimateWinner(current.boards);



    return (
      <div className="game">
        <div className="game-board">
          <UltimateBoard
            boards={current.boards}
          />
        </div>
        <div className="game-info">
          <div>{/*status*/}</div>
          <ol>{/*moves*/}</ol>
        </div>
      </div>
    );
  }
}