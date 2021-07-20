# Algorithm Visualizations

A JS library of multiple algorithms visualisations which can be added to your website with just a few lines of code. 

Use link [https://cdn.jsdelivr.net/gh/paprajapati9/algorithm-visualization@master/dist/PPviz.min.js](https://cdn.jsdelivr.net/gh/paprajapati9/pp-algo-viz@master/dist/PPviz.min.js) to add the js library in your page.

Use link [https://cdn.jsdelivr.net/gh/paprajapati9/algorithm-visualization@master/dist/PPviz.min.css](https://cdn.jsdelivr.net/gh/paprajapati9/pp-algo-viz@master/dist/PPviz.min.css) to add the related css in your page.

## List of Visualizations curretly included
1. [Recursion](https://paprajapati9.github.io/algorithm-visualization/recursion/test.html) : 
    * Hanoi Tower
2. [Graphs](https://paprajapati9.github.io/algorithm-visualization/graphs/test.html) : 
    * Breadth First Search
    * Depth First Search
3. [Backtracking](https://paprajapati9.github.io/algorithm-visualization/backtracking/test.html)
    * Sudoku
4. [Sorting](https://paprajapati9.github.io/algorithm-visualization/sorting/test.html)
    * Mergesort
5. [Greedy](https://paprajapati9.github.io/pp-algo-viz/greedy/test.html)
    * Graph Coloring (In Progress)

## Usage

```
let backtrackViz = new algoviz.BacktrackViz({
    selector: "pp-backtrack-container", //container id where the visualization is to be added
    options: { //options related to vizualization
        solve: false,
        speed: 'fast'
    }
}); 

let sudoku = backtrackViz.sudoku(); //this will create the visualization view

sudoku.then(sudokuObject =>{
     backtrackViz.options.solve = true;
     backtrackViz.options.sudoku = sudokuObject;
     backtrackViz.sudoku();
 }); //start the vizualization

```

For respective views check the test example : 

1. [Recursion](https://github.com/paprajapati9/algorithm-visualization/blob/master/recursion/test.js)
2. [Graphs](https://github.com/paprajapati9/algorithm-visualization/blob/master/graphs/test.js)
3. [Backtracking](https://github.com/paprajapati9/algorithm-visualization/blob/master/backtracking/test.js)
4. [Sorting](https://github.com/paprajapati9/algorithm-visualization/blob/master/sorting/test.js)
5. [Greedy](https://github.com/paprajapati9/algorithm-visualization/blob/master/greedy/test.js)
