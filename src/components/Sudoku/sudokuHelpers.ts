import { SudokuIndex, SudokuPiece } from "../types";

export function winCheck(squares: SudokuPiece[][]): boolean {
  for(let i = 0; i < squares.length; i++) {
    if(!rowWinCheck(squares, i as SudokuIndex) || !colWinCheck(squares, i as SudokuIndex) || !sectionWinCheck(squares, i as SudokuIndex)) {
      return false;
    }
  }
  return true;
}

function rowWinCheck(squares: SudokuPiece[][], row: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[row][i]);
  }
  return set.size == 9 && !set.has(null);
}

function colWinCheck(squares: SudokuPiece[][], col: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[i][col]);
  }
  return set.size == 9 && !set.has(null);
}

function sectionWinCheck(squares: SudokuPiece[][], section: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  let topLeft = (section % 3) * 3 + (section / 3) * 27;
  for(let i = 0; i < squares.length; i++) {
    let squareNum = (i % 3) + (i / 3) * 9 + topLeft;
    set.add(squares[squareNum / 9][squareNum % 9]);
  }
  return set.size == 9 && !set.has(null);
}

function getSectionIndex(row: SudokuIndex, col: SudokuIndex): SudokuIndex {
  return (row / 3) + (col / 3) * 3 as SudokuIndex;
}

function rowCheck(squares: SudokuPiece[][], row: SudokuIndex, piece: SudokuPiece) {
  let alreadyFound = false;
  for(let i = 0; i < squares.length; i++) {
    if(squares[row][i] == piece) {
      if(!alreadyFound) {
        alreadyFound = true;
      }
      else {
        return false;
      }
    }
  }
  return true;
}

function colCheck(squares: SudokuPiece[][], col: SudokuIndex, piece: SudokuPiece) {
  let alreadyFound = false;
  for(let i = 0; i < squares.length; i++) {
    if(squares[i][col] == piece) {
      if(!alreadyFound) {
        alreadyFound = true;
      }
      else {
        return false;
      }
    }
  }
  return true;
}

function sectionCheck(squares: SudokuPiece[][], section: SudokuIndex, piece: SudokuPiece) {
  let alreadyFound = false;
  let topLeft = (section % 3) * 3 + (section / 3) * 27;
  for(let i = 0; i < squares.length; i++) {
    let squareNum = (i % 3) + (i / 3) * 9 + topLeft;
    if(squares[squareNum / 9][squareNum % 9] == piece) {
      if(!alreadyFound) {
        alreadyFound = true;
      }
      else {
        return false;
      }
    }
  }
  return true;
}