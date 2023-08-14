import React from 'react'
import "./Board.css";
import {Box} from './Box.js';

export const Board = ({board,onClick,currentPlayer,winningCells}) => {
  return (
    <div className='board'>
        {board.map((value,idx)=>{
          return   <Box value={value} onClick={() => value === null && onClick(idx)} 
          currentPlayer={currentPlayer} 
           isWinning={winningCells.includes(idx)}
           />
        })} 
      </div>
  )
}
