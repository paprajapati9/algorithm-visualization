let backtrackViz = new algoviz.BacktrackViz({
    selector: "pp-backtrack-container",
    options: {
        solve: false
    }
});

let sudoku = backtrackViz.sudoku();

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    sudoku.then(sudokuObject =>{
        backtrackViz.options.solve = true;
        backtrackViz.options.sudoku = sudokuObject;
        backtrackViz.sudoku();
    });
});