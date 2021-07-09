let graphsViz = new algoviz.GraphsViz({
    selector: "pp-graph-container",
    options: {
        solve: false,
        startRow : 2,
        startCol : 3,
        endRow : 8,
        endCol : 9,
        speed: 'fast'
    }
});

let graph = graphsViz.bfs();
let onceRun = false;

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    if(onceRun){
        runVisualizer(graph);
    }else{
        graph.then(graphObj => {
            runVisualizer(graphObj);
            onceRun = true;
        });
    }
});

const runVisualizer = (graphObject) => {
    let startNode = document.querySelector(".start-node"),
        endNode = document.querySelector(".end-node"),
        speed = document.querySelector(".pp-viz-speed");
    let options = {
        startRow: parseInt(startNode.getAttribute("grow")),
        startCol: parseInt(startNode.getAttribute("gcolumn")),
        endRow: parseInt(endNode.getAttribute("grow")),
        endCol: parseInt(endNode.getAttribute("gcolumn")),
        solve: true,
        graph: graphObject,
        speed: speed.value
    }
    graphsViz.options = options;
    graphsViz.bfs();
}