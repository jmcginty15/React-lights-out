import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 * - generationMoves: integer, number of random moves to make to generates board
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, generationMoves = 50 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of false values (all lights off)
    for (let i = 0; i < nrows; i++) {
      const nextRow = [];
      for (let j = 0; j < ncols; j++) {
        nextRow.push(false);
      }
      initialBoard.push(nextRow);
    }

    /** make a series of random moves from a completely unlit board
     * to generate a board with both lit and unlit cells
     * 
     * this ensures the board is winnable since the board state
     * was reached from a won board by making legal moves
     */
    for (let move = 0; move < generationMoves; move++) {
      const row = Math.floor(Math.random() * nrows);
      const col = Math.floor(Math.random() * ncols);

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 || j === 0) flipCell(row + i, col + j, initialBoard);
        }
      }
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const litCells = board.some(row => row.some(cell => cell));
    return !litCells;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => row.map(cell => cell));

      // TODO: in the copy, flip this cell and the cells around it
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 || j === 0) flipCell(y + i, x + j, newBoard);
        }
      }

      // TODO: return the copy
      return newBoard;
    });
  }

  function flipCell(y, x, boardCopy) {
    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      boardCopy[y][x] = !boardCopy[y][x];
    }
  };

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) return <h1>You Won</h1>

  // make table board

  // TODO
  return (
    <div className="Board">
      <table className="Board-table">
        <tbody>
          {board.map((row, ridx) => {
            return <tr key={ridx}>{row.map((cell, cidx) => {
              const key = `${ridx}-${cidx}`;
              return <Cell key={key} testId={key} isLit={cell} flipCellsAroundMe={() => flipCellsAround(key)} />
            })}</tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
