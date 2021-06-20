import hanoi from "./sudoku/sudoku"

export default function BacktrackViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
}

BacktrackViz.prototype.sudoku = sudoku;