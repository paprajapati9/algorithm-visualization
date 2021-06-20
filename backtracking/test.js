let backtrackViz = new algoviz.BacktrackViz({
    selector: "pp-backtrack-container",
    options: {}
});

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    backtrackViz.sudoku();
});