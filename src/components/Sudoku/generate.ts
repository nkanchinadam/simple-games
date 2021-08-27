import { SudokuPiece } from '../types';

export default function generate(): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }
  return board;
}