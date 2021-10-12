import { SudokuIndex, SudokuPiece } from "../types";

export function indexToRow(index: number, boardSize: number): number {
  return Math.floor(index / boardSize)
}

export function indexToCol(index: number, boardSize: number): number {
  return index % boardSize
}

export function indexToSection(index: number, boardSize: number): number {
  
}

export function sectionToTopLeft(): number {

}