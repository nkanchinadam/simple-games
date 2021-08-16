import React from 'react';
import '../index.css';
import Board from '../TicTacToe/Board';
import { TicTacToePiece, TTTIndex } from '../types';

interface UltimateBoardProps {
  boards: TicTacToePiece[][],
  onClick: (i: TTTIndex, j: TTTIndex) => void
}

export default function UltimateBoard(props: UltimateBoardProps) {
  const renderBoard = (i: TTTIndex): JSX.Element => {
    return <Board
      squares={props.boards[i]}
      onClick={(j: TTTIndex) => props.onClick(i, j)}
    />
  }

  return (
    <div>
      <table>
        <tr>
          <td>{renderBoard(0)}</td>
          <td>{renderBoard(1)}</td>
          <td>{renderBoard(2)}</td>
        </tr>
        <tr>
          <td>{renderBoard(3)}</td>
          <td>{renderBoard(4)}</td>
          <td>{renderBoard(5)}</td>
        </tr>
        <tr>
          <td>{renderBoard(6)}</td>
          <td>{renderBoard(7)}</td>
          <td>{renderBoard(8)}</td>
        </tr>
      </table>
    </div>
  );
}