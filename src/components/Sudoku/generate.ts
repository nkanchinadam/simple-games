import { SudokuIndex, SudokuPiece } from '../types';
import { rowValid, colValid, sectionValid, sectionWinCheck } from './checks';

export default function generate(): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }
  return board;
}

function fillSection(curr: SudokuIndex, squareNums: number[], board: SudokuPiece[][], index: SudokuIndex, checkRC: boolean): void {
  if(sectionWinCheck(board, index)) {
    return;
  }

  let arr = Array(9);
  for(let i = 0; i < board.length; i++) {
    arr[i] = i + 1;
  }
  for(let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  for(let i = 0; i < board.length; i++) {
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = arr[i];

  }
}