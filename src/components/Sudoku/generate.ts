import { SudokuPiece } from '../types';
import winCheck, { rowValid, colValid, sectionValid } from './checks';
import { indexToRow, indexToCol, indexToSection, sectionToTopLeft } from './conversions';

export default function generate(): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }

  for(let i = 0; i < board.length; i += 4) {
    let section = Array(9);
    let topLeft = Math.floor(i / 3) * 27 + (i % 3) * 3;
    for(let j = 0; j < board.length; j++) {
      section[j] = topLeft + Math.floor(j / 3) * 9 + j % 3;
    }
    console.log(section)
    fillSection(0, section, board, i);
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

  while(board[Math.floor(curr / board.length)][curr % board.length] === null && curr !== 80) {
    curr++;
  }
  for(let i = 0; i < board.length; i++) {
    board[Math.floor(curr / board.length)][curr % board.length] = arr[i];
    if(rowValid(board, Math.floor(curr / board.length)) && colValid(board, curr % board.length) && sectionValid(board, Math.floor(curr / 27) * 3 + Math.floor(curr / 27))) {
      if(fillFull(curr + 1, board)) {
        return true;
      }
    }
    board[Math.floor(curr / board.length)][curr % board.length] = null;
  }
  return false;
} 