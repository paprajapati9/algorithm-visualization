let greedyViz = new algoviz.GreedyViz({
    selector: "pp-greedy-container",
    options: {
        solve: false,
        speed: 'fast',
        size: 10
    }
});

let graphcolor = greedyViz.graphcoloring();

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let speed = document.querySelector(".pp-viz-speed");
    graphcolor.then(sudokuObject =>{
        greedyViz.options.solve = true;
        greedyViz.options.sudoku = sudokuObject;
        greedyViz.options.speed = speed.value;
        greedyViz.graphcoloring();
    });
});