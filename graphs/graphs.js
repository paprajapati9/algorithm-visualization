import bfs from "./bfs/bfs"
import dfs from "./dfs/dfs"

export default function GraphsViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
    this.updateView = updateView;
    this.colorVisitingNode = colorVisitingNode;
    this.colorShortestPath = colorShortestPath;
    this.createView = createView;
}

GraphsViz.prototype.bfs = bfs;
GraphsViz.prototype.dfs = dfs;

const createView = (selector, options) => {
    let graphContainer = document.getElementById(selector);
    let table = document.createElement('table'),
        height = graphContainer.clientHeight,
        width = graphContainer.clientWidth;
    const trElements = parseInt(height/25), //create boxes of 25X25
        tdElements = parseInt(width/25);

    table.setAttribute("rules", "all");
    table.setAttribute("class", "pp-graph-table")

    for (let trel = 0; trel < trElements; trel++) {
        let tr = document.createElement('tr');
        for (let tdel = 0; tdel < tdElements; tdel++) {
            let td = document.createElement('td');
            td.setAttribute('colspan', 1);
            td.setAttribute('grow', trel);
            td.setAttribute('gcolumn', tdel);
            td.classList.add("graph-node");
            if(trel == options.startRow && tdel == options.startCol){
                td.classList.add("start-node");
            }
            else if(trel == options.endRow && tdel == options.endCol){
                td.classList.add("end-node");
            }
            td.addEventListener("mousedown", mouseDown)
            td.addEventListener("mouseenter", mouseEnter);
            td.addEventListener("mouseleave", mouseLeave);
            tr.append(td);
        }
        table.append(tr);
    }
    graphContainer.append(table);
    //Each box is a vertex and each vertex is connected to 8 other vertices except for corner ones.
    // Right, Down, Left, Up
    
    let graph = {
        'rows' : trElements,
        'columns' : tdElements,
    }
    return graph;
}

const updateView = (selector, graph) => {
    let graphContainer = document.getElementById(selector),
        tdElements = graph.columns,
        trElements = graph.rows;
    
    let leftCorner = 0, 
        RightCorner = (tdElements-1), 
        DownLeftCorner = (trElements-1)*(tdElements), 
        DownRightCorner = (trElements*tdElements-1);

    let graphAdj = Array(trElements*tdElements).fill();

    graphAdj.forEach((element, index) => {
        if(index == leftCorner) graphAdj[index] = Array(1,tdElements,0,0); //Down, Right, DownRight
        else if(index == RightCorner) graphAdj[index] = Array(0,tdElements,-1,0); //Down, Left, DownLeft
        else if(index == DownLeftCorner) graphAdj[index] = Array(1,0,0,-tdElements); //Up, Right, UpRight
        else if(index == DownRightCorner) graphAdj[index] = Array(0,0,-1,-tdElements); //Up, Left, UpLeft
        else if((index+1)%tdElements == 0) graphAdj[index] = Array(0,tdElements,-1,-tdElements); //Down, Left, DownLeft, Up, UpLeft , it's right side edges
        else if(index%tdElements == 0) graphAdj[index] = Array(1,tdElements,0,-tdElements); //Down, Right, DownRight, Up, UpRight , it's left side edges
        else graphAdj[index] = Array(1,tdElements,-1,-tdElements);
    });

    graph.graphAdj = graphAdj;

    let wallElements = graphContainer.querySelectorAll(".block-node");
    wallElements.forEach(element => {
        let row = parseInt(element.getAttribute('grow')),
            column = parseInt(element.getAttribute('gcolumn')),
            el = 0;
        
        // Right, Left, Up, Down
        //remove from top adjacent
        if(row-1 >= 0){
            el = (row-1)*graph.columns + column;
            graph.graphAdj[el][1] = 0; //1 denotes down element
        }
        //remove from down adjacent
        if(row+1 < graph.rows){
            el = (row+1)*graph.columns + column;
            graph.graphAdj[el][2] = 0; //2 denotes up element
        }
        //remove from right adjacent
        if(column+1 < graph.columns){
            el = (row)*graph.columns + column+1;
            graph.graphAdj[el][3] = 0; //3 denotes left element
        }
        //remove from left adjacent
        if(column-1 >= 0){
            el = (row)*graph.columns + column-1;
            graph.graphAdj[el][0] = 0; //0 denotes right element
        }
    });

    let visited = Array(graph.rows*graph.columns).fill(false);
    let parent = Array(graph.rows*graph.columns).fill(-1);
    let visitedElements = graphContainer.querySelectorAll(".visited");
    visitedElements.forEach(element => {
        element.classList.remove("visited");
    });
    let shortestPath = graphContainer.querySelectorAll(".shortest-path");
    shortestPath.forEach(element => {
        element.classList.remove("shortest-path");
    });
    graph.visited = visited;
    graph.parent = parent;
}

async function colorVisitingNode(node, options, vizSpeed) {
    let dashContainer = document.getElementById(options.selector);
    let graphContainer = dashContainer.querySelector(".pp-graph-table");
    let grow = parseInt(node/options.columns);
    let gcolumn = parseInt(node%options.columns);
    let nodeElement = graphContainer.querySelector(`td[grow='${grow}'][gcolumn='${gcolumn}']`);
    nodeElement.classList.add("visited");
    let speed = {
        'slow' : 40,
        'medium' : 20,
        'fast' : 10
    }
    await sleep(speed[vizSpeed]);
}


async function colorShortestPath(path, options) {
    let dashContainer = document.getElementById(options.selector);
    let graphContainer = dashContainer.querySelector(".pp-graph-table");
    for (let i = 0; i < path.length; i++) {
        const node = path[i];
        if(node == options.startNode || node == options.endNode) continue;
        let grow = parseInt(node/options.columns);
        let gcolumn = parseInt(node%options.columns);
        let nodeElement = graphContainer.querySelector(`td[grow='${grow}'][gcolumn='${gcolumn}']`);
        nodeElement.classList.add("shortest-path");
        await sleep(60);
    }
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

var nodeDragOn=false;
var startDrag = false;
var endDrag = false;

/* Events fired on the drag target */
const mouseDown = function() {
    if(!nodeDragOn){
        nodeDragOn = true;
        if(this.classList.contains("start-node")){
            startDrag = true;
        }
        if(this.classList.contains("end-node")){
            endDrag = true;
        }
    }else{
        startDrag = false;
        endDrag = false
        nodeDragOn = false;
    }
};

const mouseEnter = function() {
    if(nodeDragOn){

        if(startDrag) this.classList.add("start-node");

        else if(endDrag) this.classList.add("end-node");

        else{
            if(!this.classList.contains("start-node") && !this.classList.contains("end-node"))
                this.classList.toggle("block-node");
        }
    }
};

const mouseLeave = function() {
    if(nodeDragOn){
        if(startDrag) this.classList.remove("start-node");
        if(endDrag) this.classList.remove("end-node");
    }
};