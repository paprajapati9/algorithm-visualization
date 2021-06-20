import style from "./sukoku.css";

export default async function sodoku(){

}

const generateSudoku = () => {
    
}

const solveSudoku = () => {
    recursiveSudoku(board, 0, 0);
    display(board);
}

function Sudoku() {
    this.queue = {};
    this.tail = 0;
    this.head = 0;
}
  

Sudoku.prototype.isValidSudoku = function(board) {
    if(this.checkRowsAndColumns(board)) return true;
    return false;
}

Sudoku.prototype.checkRowsAndColumns = function(board) {
    for(i=0; i<board.size(); i++){
        if(!this.isValidRow(board[i]) || !this.isValidColumn(board, i)) return false;
    }
    
    if(!this.hasValidBox(board, 0, 0)) return false;
    return true;
}

Sudoku.prototype.hasValidBox = function(board) {
    if(this.checkRowsAndColumns(board)) return true;
    return false;
}

Sudoku.prototype.recursiveSudoku = function(board) {
    if(this.checkRowsAndColumns(board)) return true;
    return false;
}

Sudoku.prototype.isValidColumn = function(board) {
    let count = [0];
    for(i=0; i<board.size(); i++){
        let val = board[i][column] - '0';
        if(val < 0) continue;
        count[val]++;
        if(count[val] > 1) return false;
    }
    return true;
}

Sudoku.prototype.isValidRow = function(board) {
    let count = [0];
    for(i=0; i<boardArr.size(); i++){
        val = boardArr[i] - '0';
        if(val < 0) continue;
        count[val]++;
        if(count[val] > 1) return false;
    }
    return true;
}

Sudoku.prototype.isValidBox = function(board) {
    for(i=startRow; i<startRow+3; i++){
        for(j=startCol; j<startCol+3; j++){
            val = board[i][j] - '0';
            if(val < 0) continue;
            count[val]++;
            if(count[val] > 1) return false;
        }
    }
    return true;
}