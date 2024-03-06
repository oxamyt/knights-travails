class Node {
  constructor(x, y) {
    this.position = [x, y];
    this.possibleMoves = [];
  }
}

class Board {
  constructor() {
    this.board = [];
  }

  generateBoard(r = 8, c = 8) {
    this.board = Array(r)
      .fill(0)
      .map(() => {
        return Array(c).fill(0);
      });

    for (let x = 0; x < r; x++) {
      for (let y = 0; y < c; y++) {
        this.board[x][y] = new Node(x, y);
      }
    }
  }

  display() {
    for (let i = 0; i < this.board.length; i++) {
      console.log(this.board[i]);
    }
  }

  pushMoves() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const knight = new Node(x, y);
        knight.possibleMoves.push(
          [
            [x + 2, y + 1],
            [x + 1, y + 2],
            [x + 2, y - 1],
            [x + 1, y - 2],
            [x - 1, y - 2],
            [x - 2, y - 1],
            [x - 2, y + 1],
            [x - 1, y + 2],
          ].filter(
            ([nx, ny]) =>
              nx >= 0 &&
              nx < this.board.length &&
              ny >= 0 &&
              ny < this.board[x].length
          )
        );
        this.board[x][y] = knight;
      }
    }
  }

  // knightMoves(start, end) {
  //   const queue = [start];
  //   const visited = new Set();
  //   const result = [];

  //   while (queue.length) {
  //     const vertex = queue.shift();
  //     if (vertex.position === end) {
  //       return vertex.position;
  //     }
  //     if (!visited.has(vertex)) {
  //       visited.add(vertex);
  //       result.push(vertex);

  //       for (const neighbour of this.board[vertex]) {
  //         queue.push(neighbour);
  //       }
  //     }
  //   }

  //   return result;
  // }
}

const graph = new Board();

graph.generateBoard();
graph.pushMoves();
graph.display();
graph.func();
