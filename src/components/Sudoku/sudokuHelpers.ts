import { SudokuIndex, SudokuPiece } from "../types";

export function winCheck(squares: SudokuPiece[][]): boolean {
  for(let i = 0; i < squares.length; i++) {
    if(!rowCheck(squares, i as SudokuIndex) || !colCheck(squares, i as SudokuIndex) || !squareCheck(squares, i as SudokuIndex)) {
      return false;
    }
  }
  return true;
}

function rowCheck(squares: SudokuPiece[][], row: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[row][i]);
  }
  return set.size == 9 && !set.has(null);
}

function colCheck(squares: SudokuPiece[][], col: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  for(let i = 0; i < squares.length; i++) {
    set.add(squares[i][col]);
  }
  return set.size == 9 && !set.has(null);
}

function squareCheck(squares: SudokuPiece[][], square: SudokuIndex): boolean {
  let set = new Set<SudokuPiece>();
  let topLeft = (square % 3) * 3 + (square / 3) * 27
  for(let i = 0; i < squares.length; i++) {
    let squareNum = (i % 3) + (i / 3) * 9 + topLeft;
    set.add(squares[squareNum / 9][squareNum % 9]);
  }
  return set.size == 9 && !set.has(null);
}