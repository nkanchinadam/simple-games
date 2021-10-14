import { SudokuPiece } from "../types";

export default function winCheck(squares: SudokuPiece[][]): boolean {
  for(let i = 0; i < squares.length; i++) {
    if(!rowWinCheck(squares, i) || !colWinCheck(squares, i) || !sectionWinCheck(squares, i)) {
      return false;
    }
  }
  return true;
}

function rowWinCheck(squares: SudokuPiece[][], row: number): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[row][i]);
  }
  return set.size === 9 && !set.has(null);
}

function colWinCheck(squares: SudokuPiece[][], col: number): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[i][col]);
  }
  return set.size === 9 && !set.has(null);
}

function sectionWinCheck(squares: SudokuPiece[][], section: number): boolean {
  let set = new Set<SudokuPiece>();
  let topLeft = (section % 3) * 3 + Math.floor(section / 3) * 27;
  for(let i = 0; i < squares.length; i++) {
    let squareNum = topLeft + (i % 3) + Math.floor(i / 3) * 9;
    set.add(squares[Math.floor(squareNum / squares.length)][squareNum % squares.length]);
  }
  return set.size === 9 && !set.has(null);
}

export function rowValid(squares: SudokuPiece[][], row: number): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    let piece = squares[row][i];
    if(piece !== null && set.has(piece)) {
      return false;
    }
    set.add(piece);
  }
  return true;
}

export function colValid(squares: SudokuPiece[][], col: number): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    let piece = squares[i][col];
    if(piece !== null && set.has(piece)) {
      return false;
    }
    set.add(piece);
  }
  return true;
}

export function sectionValid(squares: SudokuPiece[][], section: number): boolean {
  let set = new Set<SudokuPiece>();
  let topLeft = (section % 3) * 3 + Math.floor(section / 3) * 27;
  console.log(section)
  for(let i = 0; i < squares.length; i++) {
    let squareNum = topLeft + (i % 3) + Math.floor(i / 3) * 9;
    console.log('Squares' + squares);
    let piece = squares[Math.floor(squareNum / squares.length)][squareNum % squares.length];
    if(piece !== null && set.has(piece)) {
      return false;
    }
    set.add(squares[Math.floor(squareNum / squares.length)][squareNum % squares.length]);
  }
  return true
}