import bfs from "./BFS/bfs"

export default function GraphsViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
    this.graph = createGraph(selector, options);
    this.colorVisitingNode = colorVisitingNode;
    this.colorShortestPath = colorShortestPath;
    this.createGraph = createGraph;
}

GraphsViz.prototype.bfs = bfs;

const createGraph = (selector, options) => {
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
    // Right, Left, Up, Down
    // UpRight, UpLeft, DownRight, DownLeft;
    let leftCorner = 0, 
        RightCorner = (tdElements-1), 
        DownLeftCorner = trElements*(tdElements-1), 
        DownRightCorner = (trElements*tdElements-1);

    let graphAdj = Array(trElements*tdElements).fill();

    graphAdj.forEach((element, index) => {
        if(index == leftCorner) graphAdj[index] = Array(1,0,0,tdElements); //Down, Right, DownRight
        else if(index == RightCorner) graphAdj[index] = Array(0,-1,0,tdElements); //Down, Left, DownLeft
        else if(index == DownLeftCorner) graphAdj[index] = Array(1,0,-tdElements,0); //Up, Right, UpRight
        else if(index == DownRightCorner) graphAdj[index] = Array(0,-1,-tdElements,0); //Up, Left, UpLeft
        else if((index+1)%tdElements == 0) graphAdj[index] = Array(0,-1,-tdElements,tdElements); //Down, Left, DownLeft, Up, UpLeft , it's right side edges
        else if(index%tdElements == 0) graphAdj[index] = Array(1,0,-tdElements,tdElements); //Down, Right, DownRight, Up, UpRight , it's left side edges
        else graphAdj[index] = Array(1,-1,-tdElements,tdElements);
    });
    let visited = Array(trElements*tdElements).fill(false);
    let parent = Array(trElements*tdElements).fill(-1);
    let graph = {
        'graphAdj' : graphAdj,
        'visited' : visited,
        'rows' : trElements,
        'columns' : tdElements,
        'parent' : parent
    }
    return graph;
}

async function colorVisitingNode(node, options) {
    let dashContainer = document.getElementById(options.selector);
    let graphContainer = dashContainer.querySelector(".pp-graph-table");
    let grow = parseInt(node/options.columns);
    let gcolumn = parseInt(node%options.columns);
    let nodeElement = graphContainer.querySelector(`td[grow='${grow}'][gcolumn='${gcolumn}']`);
    nodeElement.classList.add("visited");
    await sleep(10);
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

const endSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 491.582 491.582" style="enable-background:new 0 0 491.582 491.582;" xml:space="preserve">
<g><g><path d="M245.791,0C153.799,0,78.957,74.841,78.957,166.833c0,36.967,21.764,93.187,68.493,176.926    c31.887,57.138,63.627,105.4,64.966,107.433l22.941,34.773c2.313,3.507,6.232,5.617,10.434,5.617s8.121-2.11,10.434-5.617    l22.94-34.771c1.326-2.01,32.835-49.855,64.967-107.435c46.729-83.735,68.493-139.955,68.493-176.926    C412.625,74.841,337.783,0,245.791,0z M322.302,331.576c-31.685,56.775-62.696,103.869-64.003,105.848l-12.508,18.959    l-12.504-18.954c-1.314-1.995-32.563-49.511-64.007-105.853c-43.345-77.676-65.323-133.104-65.323-164.743    C103.957,88.626,167.583,25,245.791,25s141.834,63.626,141.834,141.833C387.625,198.476,365.647,253.902,322.302,331.576z"/>
<path d="M245.791,73.291c-51.005,0-92.5,41.496-92.5,92.5s41.495,92.5,92.5,92.5s92.5-41.496,92.5-92.5    S296.796,73.291,245.791,73.291z M245.791,233.291c-37.22,0-67.5-30.28-67.5-67.5s30.28-67.5,67.5-67.5    c37.221,0,67.5,30.28,67.5,67.5S283.012,233.291,245.791,233.291z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;

const startSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve"><g><path style="fill:#6ECDFB;" d="M205.004,201.27H66.731c-3.591,0-6.769-2.32-7.865-5.74c-0.366-1.14-8.945-28.338-9.694-65.59   C48.173,80.246,61.846,36.377,88.716,3.073c2.863-3.55,8.062-4.106,11.612-1.242s4.106,8.063,1.242,11.612   c-51.145,63.399-34.302,148.616-28.555,171.31h131.99c4.562,0,8.258,3.697,8.258,8.258   C213.262,197.572,209.565,201.27,205.004,201.27z"/>
<path style="fill:#6ECDFB;" d="M188.058,511.999c-2.349,0-4.682-0.996-6.315-2.932c-41.557-49.234-54.775-113.199-58.546-158.188   c-4.06-48.425,1.501-84.916,1.74-86.445c0.462-2.961,2.492-5.439,5.304-6.475l71.909-26.495c4.275-1.577,9.028,0.614,10.603,4.894   c1.578,4.279-0.614,9.027-4.893,10.603l-67.222,24.769c-1.322,11.271-4.065,41.454-0.948,78.178   c3.604,42.468,16.016,102.706,54.675,148.507c2.942,3.485,2.501,8.695-0.984,11.637   C191.83,511.359,189.938,511.999,188.058,511.999z"/>
<path style="fill:#6ECDFB;" d="M205.014,178.809c-0.514,0-1.034-0.048-1.558-0.148l-84.948-16.217   c-3.345-0.639-5.955-3.265-6.573-6.614c-0.178-0.969-4.335-24.083-0.656-54.215c4.917-40.293,21.68-73.949,48.476-97.333   c3.436-2.998,8.652-2.644,11.653,0.793c2.998,3.436,2.643,8.652-0.793,11.652c-23.901,20.857-38.328,49.925-42.881,86.397   c-2.431,19.471-1.248,36.012-0.313,44.207l79.132,15.106c4.479,0.856,7.418,5.181,6.563,9.66   C212.361,176.054,208.898,178.809,205.014,178.809z"/><path style="fill:#6ECDFB;" d="M68.604,450.253c-2.581,0-5.121-1.206-6.733-3.466c-35.079-49.233-41.244-103.876-40.239-141.047   c1.085-40.113,10.32-68.438,10.712-69.624c0.993-3.002,3.613-5.172,6.746-5.591l164.82-22.021c4.521-0.606,8.675,2.57,9.279,7.092   c0.604,4.52-2.571,8.674-7.091,9.279L46.611,246.181c-2.56,9.493-7.769,32.037-8.483,60.528   c-0.865,34.502,4.884,85.149,37.193,130.494c2.646,3.714,1.78,8.871-1.933,11.517C71.934,449.755,70.261,450.253,68.604,450.253z"/>
<path style="fill:#6ECDFB;" d="M445.27,201.27H306.996c-4.562,0-8.258-3.697-8.258-8.258c0-4.561,3.696-8.258,8.258-8.258h131.996   c2.438-9.582,6.875-30.298,7.333-55.631c0.836-46.201-11.242-85.121-35.894-115.68c-2.865-3.55-2.308-8.748,1.242-11.612   c3.549-2.864,8.749-2.308,11.612,1.242c26.868,33.304,40.542,77.174,39.543,126.867c-0.749,37.251-9.328,64.45-9.694,65.59   C452.039,198.949,448.86,201.27,445.27,201.27z"/><path style="fill:#6ECDFB;" d="M323.941,511.999c-1.881,0-3.772-0.64-5.323-1.948c-3.485-2.942-3.925-8.152-0.984-11.637   c66.729-79.058,56.68-201.208,53.721-226.688L304.14,246.96c-4.28-1.577-6.471-6.325-4.893-10.603   c1.576-4.28,6.321-6.471,10.603-4.894l71.909,26.495c2.813,1.036,4.841,3.515,5.304,6.475c0.239,1.529,5.799,38.02,1.74,86.445   c-3.771,44.989-16.99,108.953-58.546,158.188C328.623,511.003,326.29,511.999,323.941,511.999z"/>
<path style="fill:#6ECDFB;" d="M306.986,178.809c-3.885,0-7.346-2.754-8.102-6.711c-0.854-4.479,2.084-8.805,6.564-9.66   l79.132-15.106c0.934-8.191,2.118-24.732-0.313-44.207c-4.554-36.472-18.98-65.539-42.881-86.397   c-3.435-2.999-3.79-8.215-0.793-11.652c3.002-3.436,8.217-3.79,11.653-0.793c26.796,23.383,43.56,57.04,48.476,97.333   c3.679,30.133-0.478,53.246-0.656,54.215c-0.619,3.349-3.228,5.976-6.573,6.614l-84.948,16.217   C308.021,178.76,307.5,178.809,306.986,178.809z"/>
<path style="fill:#6ECDFB;" d="M443.397,450.253c-1.657,0-3.331-0.498-4.785-1.534c-3.714-2.646-4.579-7.803-1.934-11.517   c32.31-45.344,38.059-95.99,37.193-130.494c-0.714-28.489-5.922-51.03-8.483-60.528l-159.487-21.309   c-4.52-0.604-7.695-4.759-7.091-9.279c0.603-4.521,4.759-7.698,9.279-7.092l164.82,22.021c3.134,0.418,5.753,2.59,6.746,5.591   c0.392,1.186,9.628,29.511,10.712,69.624c1.005,37.171-5.16,91.814-40.239,141.047   C448.518,449.047,445.976,450.253,443.397,450.253z"/></g><g><path style="fill:#1895C2;" d="M237.461,165.755c-4.562,0-8.258-3.697-8.258-8.258v-39.249c0-4.561,3.696-8.258,8.258-8.258   s8.258,3.697,8.258,8.258v39.249C245.719,162.057,242.023,165.755,237.461,165.755z"/>
<path style="fill:#1895C2;" d="M274.538,165.755c-4.562,0-8.258-3.697-8.258-8.258v-39.249c0-4.561,3.696-8.258,8.258-8.258   c4.562,0,8.258,3.697,8.258,8.258v39.249C282.796,162.057,279.1,165.755,274.538,165.755z"/><path style="fill:#1895C2;" d="M284.66,263.586L256,241.565l-28.661,22.021c-32.724,11.759-56.144,43.052-56.144,79.817   c0,46.84,37.976,84.805,84.805,84.805s84.805-37.965,84.805-84.805C340.804,306.638,317.384,275.345,284.66,263.586z"/></g><path style="fill:#6ECDFB;" d="M283.681,146.487h-55.362c-12.883,0-23.31,10.438-23.31,23.31v70.524  c0,12.552,9.91,22.748,22.33,23.266h57.322c12.42-0.518,22.33-10.713,22.33-23.266v-70.524  C306.99,156.925,296.563,146.487,283.681,146.487z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;


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

        if(endDrag) this.classList.add("end-node");
    }
};

const mouseLeave = function() {
    if(nodeDragOn){
        if(startDrag) this.classList.remove("start-node");
        if(endDrag) this.classList.remove("end-node");
    }
};
