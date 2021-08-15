import React from 'react';
import '../index.css';

interface SquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
}

export default function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}