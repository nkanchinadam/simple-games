import React from 'react';
import '../../index.css';
import TTTBoard from '../TicTacToe/TTTBoard';
import { TicTacToePiece } from '../types';

interface UltimateBoardProps {
  boards: TicTacToePiece[][],
  onClick: (i: number, j: number) => void
}

export default function UltimateBoard(props: UltimateBoardProps) {
  const renderBoard = (i: number): JSX.Element => {
    return <TTTBoard
      squares={props.boards[i]}
      onClick={(j: number) => props.onClick(i, j)}
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