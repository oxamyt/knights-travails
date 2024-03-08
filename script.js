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
    this.pushMoves();
  }

  display() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        console.log(this.board[i][j].possibleMoves);
      }
    }
  }

  pushMoves() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const knight = this.board[x][y];
        knight.possibleMoves.push(
          ...[
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

  knightMoves(start, end) {
    const startPosition = this.board[start[0]][start[1]];
    const endPosition = this.board[end[0]][end[1]];
    const queue = [[startPosition]];
    const visited = new Set([startPosition]);

    while (queue.length !== 0) {
      const currentPath = queue.shift();
      const currentNode = currentPath[currentPath.length - 1];

      if (
        currentNode.position[0] === endPosition.position[0] &&
        currentNode.position[1] === endPosition.position[1]
      ) {
        return currentPath.map((node) => node.position);
      }
      for (const neighbor of currentNode.possibleMoves) {
        const nextNode = this.board[neighbor[0]][neighbor[1]];

        if (!visited.has(nextNode)) {
          visited.add(nextNode);
          queue.push([...currentPath, nextNode]);
        }
      }
    }
    return null;
  }
}

const graph = new Board();

graph.generateBoard();
const result = graph.knightMoves([0, 0], [6, 6]);
console.log(result);
