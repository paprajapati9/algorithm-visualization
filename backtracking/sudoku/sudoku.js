export default async function sudoku(){
    solveSudoku();
}

const generateSudoku = () => {
    
}

const solveSudoku = () => {
    let sudoku = new Sudoku();
    console.log(sudoku);
    sudoku.solve(0, 0);
    // console.log(sudoku);
}

function Sudoku() {
    this.board = new Array(9);
    for (let index = 0; index < this.board.length; index++) {
        this.board[index] = Array(9).fill(0);
    }
    this.count = Array(9).fill(0);
}

Sudoku.prototype.resetCount = function() {
    for (let index = 0; index < this.count.length; index++) {
        this.count[index] = 0;
    }
}

Sudoku.prototype.solve = function(startRow, startCol) {
    if(startRow==8 && startCol==9) return 1;
        if (startCol == 9) {
            startRow++;
            startCol = 0;
        }
        let val = this.board[startRow][startCol];
        let k;
        if(val == 0){ //empty place
            for(k=1; k<=9; k++){
                this.board[startRow][startCol] = k;
                if(!this.isValidRow(startRow) || !this.isValidColumn(startCol)) continue;
                if(!this.isValidBox(3*parseInt(startRow/3), 3*parseInt(startCol/3))) continue;
                if(this.solve(startRow, startCol+1)) return 1;
            }
            if(k == 10) {
                this.board[startRow][startCol] = 0;
                return 0;
            }
        }else{
            return this.solve(startRow, startCol+1);
        }
        return 0;
}

Sudoku.prototype.isValidSudoku = function() {
    for(let i=0; i<this.board.length; i++){
        if(!this.isValidRow(i) || !this.isValidColumn(i)) return false;
    }
    
    if(!this.hasValidBox(0, 0)) return false;
    return true;
}

Sudoku.prototype.hasValidBox = function(startRow, startCol) {
    this.resetCount();
    for(let i=startRow; i<startRow+3; i++){
        for(let j=startCol; j<startCol+3; j++){
            let val = this.board[i][j];
            if(val == 0) continue;
            this.count[val]++;
            if(this.count[val] > 1) return false;
        }
    }
    if(startCol < 6) return this.hasValidBox(startRow, startCol+3);
    else if(startRow < 6) return this.hasValidBox(startRow+3, 0);
    
    return true;
}

Sudoku.prototype.isValidColumn = function(column) {
    this.resetCount();
    for(let i=0; i<this.board.length; i++){
        let val = this.board[i][column];
        if(val == 0) continue;
        this.count[val]++;
        if(this.count[val] > 1) return false;
    }
    return true;
}

Sudoku.prototype.isValidRow = function(row) {
    this.resetCount();
    for(let i=0; i<this.board[row].length; i++){
        let val = this.board[row][i];
        if(val == 0) continue;
        this.count[val]++;
        if(this.count[val] > 1) return false;
    }
    return true;
}

Sudoku.prototype.isValidBox = function(startRow, startCol) {
    this.resetCount();
    for(let i=startRow; i<startRow+3; i++){
        for(let j=startCol; j<startCol+3; j++){
            let val = this.board[i][j];
            if(val == 0) continue;
            this.count[val]++;
            if(this.count[val] > 1) return false;
        }
    }
    return true;
}