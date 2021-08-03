import React from 'react';
import './index.css';
import {Board, Game, calculateWinner, nullCheck} from './board.js';

class UltimateBoard extends React.Component {
  renderBoard(i) {
    return <Board

    />
  }
}

export class UltimateGame extends Game {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(Array(9).fill(null)),
        nextBoard: null
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  
}