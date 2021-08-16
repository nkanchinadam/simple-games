import { calculateWinner } from '../TicTacToe/ticTacToeHelpers';
import { TicTacToePiece } from '../types';

export function createReducedBoard(boards: TicTacToePiece[][]): TicTacToePiece[] {
  let reduced = Array(9);
  for(let i = 0; i < reduced.length; i++) {
    reduced[i] = calculateWinner(boards[i]);
  }
  return reduced;
}

export function calculateUltimateWinner(boards: TicTacToePiece[][]): TicTacToePiece {
  let reduced = createReducedBoard(boards)
  return calculateWinner(reduced);
}