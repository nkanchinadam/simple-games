import React from 'react';
import './index.css';

class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      board: Array(9).fill(Array(9).fill(Array(0))),
      solved: Array(9).fill(Array(9).fill(null)),
      starting: Array(9).fill(Array(9).fill(null))
    })
  }
    
  render() {

  }
}