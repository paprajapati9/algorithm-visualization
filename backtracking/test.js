let backtrackViz = new algoviz.BacktrackViz({
    selector: "pp-backtrack-container",
    options: {
        solve: false,
        speed: 'fast'
    }
});

let sudoku = backtrackViz.sudoku();

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let speed = document.querySelector(".pp-viz-speed");
    sudoku.then(sudokuObject =>{
        backtrackViz.options.solve = true;
        backtrackViz.options.sudoku = sudokuObject;
        backtrackViz.options.speed = speed.value;
        backtrackViz.sudoku();
    });
});