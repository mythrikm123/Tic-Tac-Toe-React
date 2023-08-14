import React, { useState } from 'react';
import './Box.css';

export const Box = ({ value, onClick, currentPlayer, isWinning }) => {
  const [isClicked, setIsClicked] = useState(false);
  let style = "box";
  if (value === "X") {
    style = currentPlayer === "X" ? "box current-player-x" : "box x";
  } else if (value === "O") {
    style = currentPlayer === "O" ? "box current-player-o" : "box o";
  }

  if (isWinning) {
    style += " winning-cell";
    if (value === "X") {
      style += " winning-x";
    } else if (value === "O") {
      style += " winning-o";
    }
  }

  if (isClicked) {
    style += " clicked-cell";
  }

  return (
    <div className='board'>
      <button
        className={style}
        onClick={() => {
          onClick();
          setIsClicked(true);
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default Box;
