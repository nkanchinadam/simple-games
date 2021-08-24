import React, { useState } from 'react';
import '../index.css';
import TicTacToe from './TicTacToe/TicTacToe';
import UltimateTTT from './UltimateTTT/UltimateTTT';
import Sudoku from './Sudoku/Sudoku';

export default function App() {
  const [game, setGame] = useState<JSX.Element[]>([<TicTacToe />, <UltimateTTT />, <Sudoku />]);
  const [index, setIndex] = useState(0);

  const changeGame = (i: number): void => {
    setIndex(i);
  }

  return (
    <>
      <button onClick={() => changeGame(0)}>TTT</button>
      <button onClick={() => changeGame(1)}>UltimateTTT</button>
      <button onClick={() => changeGame(2)}>Sudoku</button>
      {game[index]}
    </>
  )
}