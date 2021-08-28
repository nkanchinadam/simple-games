import { SudokuIndex, SudokuPiece } from '../types';
import { rowValid, colValid, sectionValid, sectionWinCheck } from './checks';

export default function generate(): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }
  
  let sections: number[][] = Array(9);
  for(let i = 0; i < board.length; i++) {
    sections[i] = Array(9).fill(null);
    let topLeft = Math.floor(i / 3) * 27 + (i % 3) * 3;
    for(let j = 0; j < board.length; j++) {
      sections[i][j] = topLeft + Math.floor(j / 3) * 9 + (j % 3);
    }
  }

  for(let i = 0; i < board.length; i += 4) {
    fillSection(0, sections[i], board, i as SudokuIndex, false);
  }
  for(let i = 0; i < board.length; i++) {
    if(i % 4 !== 0) {
      fillSection(0, sections[i], board, i as SudokuIndex, true);
    }
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
    if(sectionValid(board, index) && (!checkRC || (rowValid(board, Math.floor(squareNums[curr] / board.length) as SudokuIndex) && colValid(board, squareNums[curr] % board.length as SudokuIndex)))) {
      fillSection(curr + 1 as SudokuIndex, squareNums, board, index, checkRC);
    }
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = null;
  }
}