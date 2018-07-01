import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const nSize = 13;
const WIN_STONE_COUNT = 5;

const firstPlayer = 'B';
const second = 'W';

const Board = ({ board, onCellClick }) => {
  const boardRows = board.map((row, y) => {
    const columns = row.map((stone, x) => {
      const background = stone === 0 ? '' : stone === 'B' ? 'black' : 'white';
      return (
        <div
          className="board-cell"
          onClick={() => onCellClick(y, x)}
          key={`column-${y}-${x}`}
        >
          <div className={`${background} stone`} />
        </div>
      );
    });
    return (
      <div className="board-row" key={`row-${y}`}>
        {columns}
      </div>
    );
  });

  return <div className="board">{boardRows}</div>;
};

class App extends Component {
  constructor() {
    super();

    const board = [];

    for (let i = 0; i < nSize; i++) {
      board.push(new Array(nSize).fill(0));
    }

    this.state = { board, currentPlayer: firstPlayer, isGameOver: false };

    this.onCellClick = this.onCellClick.bind(this);
  }

  isGameOver({ board, currentPlayer }, y, x) {
    const yCheck = () => {
      let count = 0;
      let rowIndex = 0;
      while (rowIndex < nSize) {
        const stone = board[rowIndex][x];
        if (stone === currentPlayer) {
          count++;
        } else {
          count = 0;
        }
        // Satisfies win condition
        if (count === WIN_STONE_COUNT) {
          return true;
        }
        rowIndex++;
      }
      return false;
    };
    const xCheck = () => {
      let count = 0;
      let i = 0;
      while (i < nSize) {
        const stone = board[y][i];
        if (stone === currentPlayer) {
          count++;
        } else {
          count = 0;
        }
        // Satisfies win condition
        if (count === WIN_STONE_COUNT) {
          return true;
        }
        i++;
      }
      return false;
    };
    const leftDiagonalCheck = () => {
      let count = 0;
      let startY = Math.max(0, y - x);
      let startX = Math.max(0, x - y);

      while (startX < nSize && startY < nSize) {
        const stone = board[startY][startX];

        if (stone === currentPlayer) {
          count++;
        } else {
          count = 0;
        }
        // Satisfies win condition
        if (count === WIN_STONE_COUNT) {
          return true;
        }
        startY += 1;
        startX += 1;
      }
      return false;
    };

    const rightDiagonalCheck = () => {
      let count = 0;
      let startY = Math.min(x + y, nSize - 1);
      let startX = Math.max(x - (nSize - 1 - y), 0);

      while (startX < nSize && startY >= 0) {
        const stone = board[startY][startX];
        if (stone === currentPlayer) {
          count++;
        } else {
          count = 0;
        }

        console.log('Start Y ', startY, ' Start X ', startX, ' Count ', count);

        // Satisfies win condition
        if (count === WIN_STONE_COUNT) {
          return true;
        }
        startY -= 1;
        startX += 1;
      }
      return false;
    };

    return yCheck() || xCheck() || leftDiagonalCheck() || rightDiagonalCheck();
  }

  onCellClick(y, x) {
    console.log(`Y ${y} X ${x}`);

    const { board, currentPlayer } = this.state;
    // If column already has stone in it, prevent other actions
    if (board[y][x] !== 0) {
      return;
    }
    // Update board position
    board[y][x] = currentPlayer;

    const isGameOver = this.isGameOver(this.state, y, x);
    if (isGameOver) {
      alert('Game Over');

      // Reset board
      return;
    } else {
      this.setState(({ currentPlayer }) => {
        return {
          board,
          // Change player
          currentPlayer: currentPlayer === firstPlayer ? second : firstPlayer
        };
      });
    }
  }

  render() {
    console.log('Board', this.state.board);
    return (
      <div className="App">
        <Board board={this.state.board} onCellClick={this.onCellClick} />
      </div>
    );
  }
}

export default App;
