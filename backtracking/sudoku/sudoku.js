import style from "./sudoku.css";

export default async function sudoku(){
    if(this.options.solve){
        solveSudoku(this.selector, this.options.sudoku);
    }else{
        return generateSudoku(this.selector);
    }
}

const generateSudoku = async(selector) => {
    let sudoku = new Sudoku();
    await sudoku.solve(0, 0, false, selector);
    sudoku.generateUniqueBoard();
    sudoku.createBoardDisplay(selector);
    console.log(sudoku, "before solve");
    return sudoku;
}

const solveSudoku = async(selector, sudoku) => {
    sudoku.fillOptions = Array(9).fill().map((_, index) => index + 1);
    await sudoku.solve(0, 0, true, selector);
    console.log(sudoku, "after solve");
}

function Sudoku() {
    this.board = new Array(9);
    for (let index = 0; index < this.board.length; index++) {
        this.board[index] = Array(9).fill(0);
    }
    this.count = Array(9).fill(0);
    this.fillOptions = Array(9).fill().map((_, index) => index + 1);
    this.fillOptions.sort(() => Math.random() - 0.5);
    this.fillOptions.sort(() => Math.random() - 0.5);
}

Sudoku.prototype.resetCount = function() {
    for (let index = 0; index < this.count.length; index++) {
        this.count[index] = 0;
    }
}

Sudoku.prototype.solve = async function(startRow, startCol, fill=false, selector) {
    if(startRow==8 && startCol==9) return 1;
        if (startCol == 9) {
            startRow++;
            startCol = 0;
        }
        let val = this.board[startRow][startCol];
        let k;

        if(val == 0){ //empty place
            for(k=0; k<this.fillOptions.length; k++){
                this.board[startRow][startCol] = this.fillOptions[k];
                if(fill) {
                    await this.fillBoard(startRow, startCol, selector);
                }
                if(!this.isValidRow(startRow) || !this.isValidColumn(startCol)) continue;
                if(!this.isValidBox(3*parseInt(startRow/3), 3*parseInt(startCol/3))) continue;
                if(await this.solve(startRow, startCol+1, fill, selector)) return 1;
            }
            if(k == 9) {
                this.board[startRow][startCol] = 0;
                if(fill) {
                    await this.fillBoard(startRow, startCol, selector);
                }
                return 0;
            }
        }else{
            return await this.solve(startRow, startCol+1, fill, selector);
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

Sudoku.prototype.generateUniqueBoard = function(){
    let arr = [];
    while(arr.length < 64){
        let r = Math.floor(Math.random() * 80);
        if(arr.indexOf(r) === -1) {
            arr.push(r);
            this.board[parseInt(r/9)][r%9] = 0;
        }
    }
}

Sudoku.prototype.createBoardDisplay = function(selector){
    let container = document.getElementById(selector);
    let board = document.createElement('table');
    board.className = 'pp-sudoku-board';
    for (let i = 0; i < this.board.length; i++) {
        let bRow = document.createElement('tr');
        bRow.setAttribute("boardRow", i);
        for (let j = 0; j < this.board[i].length; j++) {
            let bCol = document.createElement('td');
            if(this.board[i][j]) bCol.textContent = this.board[i][j];
            bCol.setAttribute("boardCol", j);
            bCol.setAttribute("boardRow", i);
            bRow.append(bCol);
        }
        board.append(bRow);
    }
    container.append(board);
}

Sudoku.prototype.fillBoard = async function(row, column, selector){
    await sleep(20);
    let container = document.getElementById(selector);
    let board = container.querySelector('.pp-sudoku-board');
    console.log(board, board);
    let cell = board.querySelector(`[boardRow='${row}'][boardCol='${column}']`);
    cell.textContent = this.board[row][column] ? this.board[row][column] : '';
}

/**
 * 
 * @param {int} ms : time in milliseconds for which the program needs to be paused
 * @returns : A seTimeout promise that is resolved ms milliseconds later
 */
 function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}