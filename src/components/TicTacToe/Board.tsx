import React from 'react';
import '.../index.css';
import Square from '../Square';

interface BoardProps {
  squares: ('X' | 'O' | null)[];
  onClick: (i: number) => void;
}

export default function Board(props: BoardProps) {
  const renderSquare = (i: number) =>
}
export class Board extends React.Component {
  renderSquare(i: number) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
  
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}