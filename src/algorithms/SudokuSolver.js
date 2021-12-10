const isSafe = (board, row, col, num, arraySteps) => {
    for (let d = 0; d < 9; d++) {
        if (board[row][d] == num) {
            return false;
        }
    }
    for (let r = 0; r < 9; r++) {
        if (board[r][col] == num) {
            return false;
        }
    }

    // let s = Math.sqrt(9)
    let s = 3;
    let boxRowStart = row - row % s;
    let boxColStart = col - col % s;

    for (let r = boxRowStart; r < boxRowStart + s; r++) {
        for (let d = boxColStart; d < boxColStart + s; d++) {
            if (board[r][d] == num) {
                return false;
            }
        }
    }
    // console.log(board);
    // arraySteps.push(board.slice());
    return true;
}
let i = 0;
const solve = (board, arraySteps, colorSteps) => {
    // console.log("board: ", i++, board)
    // let colorKey = colorSteps[colorSteps.length - 1].slice();
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }
    if (isEmpty) {
        return true;
    }
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num, arraySteps)) {
            board[row][col] = num;
            if (solve(board, arraySteps, colorSteps)) {
                // console.log("board: ", board)
                // await arraySteps.push(board);
                // colorKey[row][col] = 1;
                // colorKey[row][col + 1] = 1;
                // colorSteps.push(colorKey.slice());

                return true;
            } else {
                board[row][col] = 0;
                // colorKey[row][col] = 0;
                // colorKey[row][col + 1] = 0;
            }
        }
    }
    // await arraySteps.push(board);
    // colorKey[arraySteps.length - 1 - row] = 2;
    // colorSteps.push(colorKey.slice());
    return false;
}

const solver = async (board, arraySteps, colorSteps) => {
    arraySteps.push(board.slice());
    // console.log("board: ", board);
    await solve(board, arraySteps, colorSteps);
    return;
}

// var grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
// [5, 2, 0, 0, 0, 0, 0, 0, 0],
// [0, 8, 7, 0, 0, 0, 0, 3, 1],
// [0, 0, 3, 0, 1, 0, 0, 8, 0],
// [9, 0, 0, 8, 6, 3, 0, 0, 5],
// [0, 5, 0, 0, 9, 0, 6, 0, 0],
// [1, 3, 0, 0, 0, 0, 2, 5, 0],
// [0, 0, 0, 0, 0, 0, 0, 7, 4],
// [0, 0, 5, 2, 0, 6, 3, 0, 0]];

// if (solve(grid) == true)
//     printGrid(grid);
// else {
//     console.log("no")
// }
// cout << "No solution exists";

export default solver;


// let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// let str = "a11472o5t6"

// for (let i = 0; i < str.length; i++) {
//     if (str[i] >= '0' && str[i] <= '9') {
//         arr[str[i]]++;
//     }
// }

// console.log(arr);