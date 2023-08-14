import './App.css';
import React, { useState } from "react";
import { Title } from './components/Title';
import { Board } from './components/Board';
import { ResetButton } from './components/ResetButton';

function App() {
  // Checking condition
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setPlaying] = useState(true);
  const [winner, setWinner] = useState(null);  

  const boxClick = (boxIdx) => {
    if (winner || board[boxIdx]) return;
  
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });
  
    // Winner found or not
    const winnerFound = checkWinner(updatedBoard);
    if (winnerFound) {
      setBoard(updatedBoard);
      setWinner(winnerFound);
    } else {
      setBoard(updatedBoard);
      setPlaying(!xPlaying);
    }
  };
  
  // Check winner
  const checkWinner = (board) => {
    for (let i = 0; i < winning.length; i++) {
      const [x, y, z] = winning[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return {
          player: board[x],
          line: [x, y, z]
        };
      }
    }
    return null;
  };
  
  const isBoardFull = board.every((value) => value !== null);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlaying(true);
    setWinner(null);
  };
  
  return (
    <div className="App">
      <Title />
      {winner ? (
        <div>
          <h3 className="winningplayer">
            Player {winner.player === 'X'
             ? <span className="winningplayer-x">X</span> 
            : <span className="winningplayer-o">O</span>} wins!
          </h3>
        </div>
      ) : isBoardFull ? (
        <div>
          <h2 className="draw">It's a Draw!</h2>
        </div>
      ) : (
        <div>
          <h3 className={`currentplayer`}>
            Current Player: {xPlaying 
            ? <span className="player-x">X</span>
             : <span className="player-o">O</span>}
          </h3>
        </div>
      )}
      <Board 
          board={board} onClick={boxClick} 
          currentPlayer={xPlaying ? "X" : "O"} 
          winningCells={winner ? winner.line : []} 
      />
      <div className='resetbutton'>
        {winner || isBoardFull ? 
        <ResetButton onClick={resetGame} /> : null}
      </div>
    </div>
  );
}

export default App;
