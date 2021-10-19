import { SudokuPiece } from '../types';
import winCheck, { rowValid, colValid, sectionValid } from './checks';
import { indexToRow, indexToCol, indexToSection, sectionToTopLeft, sectionIndexToSquareNum } from './conversions';

export default function generate(): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }

  for(let i = 0; i < board.length; i += 4) {
    let sectionNums = Array(9);
    let topLeft = sectionToTopLeft(i);
    for(let j = 0; j < board.length; j++) {
      sectionNums[j] = sectionIndexToSquareNum(topLeft, j);
    }
    fillSection(0, sectionNums, board, i);
  }
  fillFull(0, board);
  return board;
}

function fillSection(curr: number, squareNums: number[], board: SudokuPiece[][], index: number): boolean {
  if(curr === 9) {
    return true;
  }

  let arr = Array(board.length);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = i + 1;
  }
  for(let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  for(let i = 0; i < board.length; i++) {
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = arr[i];
    if(sectionValid(board, index)) {
      if(fillSection(curr + 1, squareNums, board, index)) {
        return true;
      }
    }
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = null;
  }
  return false;
}

function fillFull(curr: number, board: SudokuPiece[][]): boolean {
  if(curr === board.length * board.length) {
    return winCheck(board);
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
    board[Math.floor(curr / board.length)][curr % board.length] = arr[i];
    console.log(board)
    if(rowValid(board, indexToRow(curr)) && colValid(board, indexToCol(curr)) && sectionValid(board, indexToSection(curr))) {
      if(fillFull(curr + 1, board)) {
        return true;
      }
    }
    board[Math.floor(curr / board.length)][curr % board.length] = null;
  }
  return false;
} 