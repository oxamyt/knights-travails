// Node class for knight
class Node {
  constructor(x, y) {
    this.position = [x, y];
    this.possibleMoves = [];
  }
}

// Board class for gameBoard and methods
class Board {
  constructor() {
    this.board = [];
  }

  // Generating board and pushing nodes with possible moves
  generateBoard(r = 8, c = 8) {
    this.board = Array(r)
      .fill(0)
      .map(() => {
        return Array(c).fill(0);
      });

    // Loop for creating nodes with positions and possible moves
    for (let x = 0; x < r; x++) {
      for (let y = 0; y < c; y++) {
        this.board[x][y] = new Node(x, y);
        this.board[x][y].possibleMoves.push(
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
      }
    }
  }

  // Breadth-first search algorithm for shortest path
  knightMoves(start, end) {
    const startPosition = this.board[start[0]][start[1]];
    const endPosition = this.board[end[0]][end[1]];

    // Queue for different paths
    const queue = [[startPosition]];

    // Visited nodes
    const visited = new Set();
    visited.add(startPosition);

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

// Tests
const graph = new Board();

graph.generateBoard();
console.log(graph.knightMoves([0, 0], [4, 5]));
