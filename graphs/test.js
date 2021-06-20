let graphsViz = new algoviz.GraphsViz({
    selector: "pp-graph-container",
    options: {
        startRow : 2,
        startCol : 15,
        endRow : 8,
        endCol : 9
    }
});

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let startNode = document.querySelector(".start-node"),
        endNode = document.querySelector(".end-node");
    let options = {
        startRow: parseInt(startNode.getAttribute("grow")),
        startCol: parseInt(startNode.getAttribute("gcolumn")),
        endRow: parseInt(endNode.getAttribute("grow")),
        endCol: parseInt(endNode.getAttribute("gcolumn"))
    }
    graphsViz.options = options;
    graphsViz.bfs();
});