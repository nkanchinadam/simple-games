import { SudokuIndex, SudokuPiece } from '../types';
import winCheck, { rowValid, colValid, sectionValid } from './checks';

export default function generate(numRemove: number): SudokuPiece[][] {
  let board = Array(9);
  for(let i = 0; i < board.length; i++) {
    board[i] = Array(9).fill(null);
  }
  fill(0, board);

  let indices = new Set<number>();
  for(let i = 0; i < board.length * board.length; i++) {
    indices.add(i);
  }
  remove();

  return board;
  /*
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
  return board;*/
}

function fill(curr: number, board: SudokuPiece[][]): boolean {
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
    if(rowValid(board, Math.floor(curr / board.length) as SudokuIndex) && colValid(board, curr % board.length as SudokuIndex) && sectionValid(board, Math.floor(curr / 27) * 3 + Math.floor(curr / 3) as SudokuIndex)) {
      if(fill(curr + 1, board)) {
        return true;
      }
    }
    board[Math.floor(curr / board.length)][curr % board.length] = null;
  }
  return false;
}

function remove(board: SudokuPiece[][]): boolean {

}

/*function fillSection(curr: number, squareNums: number[], board: SudokuPiece[][], index: SudokuIndex, checkRC: boolean): boolean {
  if(sectionWinCheck(board, index)) {
    return true;
  }


  for(let i = 0; i < board.length; i++) {
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = arr[i];
    if(sectionValid(board, index) && (!checkRC || (rowValid(board, Math.floor(squareNums[curr] / board.length) as SudokuIndex) && colValid(board, squareNums[curr] % board.length as SudokuIndex)))) {
      if(fillSection(curr + 1 as SudokuIndex, squareNums, board, index, checkRC)) {
        return true;
      }
    }
    board[Math.floor(squareNums[curr] / board.length)][squareNums[curr] % board.length] = null;
  }
  return false;
}*/