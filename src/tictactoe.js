import React from 'react';
import './index.css';
import {Board, calculateWinner, nullCheck} from './board';

export class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if(calculateWinner(squares) != null || squares[i] != null) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  
  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0
    })
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
  
    const moves = history.map((board, move) => {
      const description = move === 0 ? "Go to game start" : "Go to move #" + move;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });
  
    let status;
    if(winner == null && nullCheck(current.squares)) {
      status = "Tied game";
    }
    else if(winner == null) {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'Os');
    }
    else {
      status = "Winner: " + winner;
    }
      
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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