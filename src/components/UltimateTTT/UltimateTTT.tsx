import React from 'react';
import '../index.css';
import {Board, calculateWinner, nullCheck} from './Board';

function createReducedBoard(boards: ('X' | 'O' | null)[][]): ('X' | 'O' | null)[] {
  let reduced = Array(9);
  for(let i = 0; i < reduced.length; i++) {
    reduced[i] = calculateWinner(boards[i]);
  }
  return reduced;
}

function calculateUltimateWinner(boards: ('X' | 'O' | null)[][]): ('X' | 'O' | null)[] {
  let reduced = createReducedBoard(boards)
  return calculateWinner(reduced);
}

interface UltimateBoardProps {
  boards: ('X' | 'O' | null)[][],
  onClick: (i: number, j: number) => void
}

class UltimateBoard extends React.Component<UltimateBoardProps, UltimateBoardState> {
  renderBoard(i: number) {
    return <Board
      squares={this.props.boards[i]}
      onClick={(j: number) => this.props.onClick(i, j)}
    />
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>{this.renderBoard(0)}</td>
            <td>{this.renderBoard(1)}</td>
            <td>{this.renderBoard(2)}</td>
          </tr>
          <tr>
            <td>{this.renderBoard(3)}</td>
            <td>{this.renderBoard(4)}</td>
            <td>{this.renderBoard(5)}</td>
          </tr>
          <tr>
            <td>{this.renderBoard(6)}</td>
            <td>{this.renderBoard(7)}</td>
            <td>{this.renderBoard(8)}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export class UltimateTTT extends React.Component<{}, UltimateTTTState> {
  constructor(props: {}) {
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
    console.log('after check')
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
    if(winner == null && nullCheck(createReducedBoard(current.boards))) {
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