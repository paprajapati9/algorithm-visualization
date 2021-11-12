import style from "./graphcoloring.css";

var colors = ["red", "blue", "yellow", "green", "orange", "#4deeea", "#f000ff"]

export default async function graphcoloring(){
    if(this.options.solve){
        await solveColoring(this.selector, this.options);
    }else{
        return createGraph(this.selector, this.options);
    }
}

const createGraph = function(selector, options){
    let graph = new Graph(options, selector);
    graph.createView(selector);
    console.log(graph);
    return graph;
}

const solveColoring = async function(selector, options){
    let graph = options.graph;
    console.log(options);
    await graph.updateView(selector);
}

/**
 * TODO : Utility functions-> To be moved later
 */
 function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

Graph.prototype.createNodePoint  = function (selector, center, radius, angle, nodeNumber, canvasLeft, canvasTop) {
    let radian = (angle/180)*Math.PI;
    let x = center[0] + radius * Math.cos(radian),
        y = center[1] + radius * Math.sin(radian);
    console.log(x, y);
    let container = document.getElementById(selector);
    let point = document.createElement('div');
    point.className = `pp-node-circle pp-node-${nodeNumber}`;
    point.style.position = 'absolute';
    point.style.top = y+'px';
    point.style.left = x+'px';
    //console.log(point, "point");
    this.nodePositions[nodeNumber] = [x-canvasLeft+15, y-canvasTop+15];
    container.append(point);
}

function Graph(options, selector){

    this.nodesDegreeMap = Object();

    this.graphAdj = this.createRandomGraphAdj(options.size);
    console.log(this.graphAdj);

    this.totalNodes = this.graphAdj.length;

    this.regions = (this.totalNodes)*(this.totalNodes);

    this.nodePositions = Array(this.totalNodes);

    this.nodeColors = Array(this.totalNodes).fill(0);
}

Graph.prototype.drawGraph = function(selector){   
    let container = document.getElementById(selector);
    let radius = 190;
    let fixedAngle = 360/this.totalNodes,
        currentAngle = 0;
    console.log(fixedAngle, "t");

    //get the center of the canvas
    const canvas = container.querySelector("canvas");
    if (canvas.getContext) {
        const position = canvas.getBoundingClientRect();
        const left = position.left,
              top = position.top;
        let xposition = (position.left + position.right)/2;
        let yposition = (position.top + position.bottom)/2;
        let center = [xposition, yposition];
        for (let i = 0; i < this.totalNodes; i++) {
            this.createNodePoint(selector, center, radius, currentAngle, i, left, top);
            currentAngle += fixedAngle;
        }

        console.log(this.nodePositions, "positions");
        const ctx = canvas.getContext('2d');
        for (let i = 0; i < this.totalNodes; i++) {
            let begin  = this.nodePositions[i];
            
            for (let j = 0; j < this.graphAdj[i].length; j++) {
                let end = this.nodePositions[this.graphAdj[i][j]];
                
                drawLine(ctx, begin, end);
            }
            
        }
    }

}

Graph.prototype.createRandomGraphAdj = function(size){
    let graph = Array(size).fill(0);
    graph.forEach((element, index) => {
        let degree = Math.floor((Math.random() * (size-3)) - 1);
        let numbers = Array(size).fill().map((_, index) => index);
        numbers.splice(index, 1);
        numbers.sort(() => Math.random() - 0.5);
        numbers.sort(() => Math.random() - 0.5);
        numbers.splice(degree);
        if(Array.isArray(graph[index])){
            for (let i = 0; i < numbers.length; i++) {
                if(!graph[index].includes(numbers[i])){
                    graph[index].push(numbers[i]);
                }
            }
        }else graph[index] = numbers;

        for (let i = 0; i < numbers.length; i++) {
            if(Array.isArray(graph[numbers[i]])) {
                if(!graph[numbers[i]].includes(index)){
                    graph[numbers[i]].push(index);
                }
            }
            else graph[numbers[i]] = [index];
        }
        this.nodesDegreeMap[index] = graph[index].length;
    });
    return graph;
}

Graph.prototype.createView = function(selector){
    this.drawGraph(selector);
}

Graph.prototype.updateView = async function(selector){
    console.log(this.nodesDegreeMap, "as");

    const map = this.nodesDegreeMap;
    let maxDegreeKeySorted = Object.keys(map).sort(function(a,b){return map[b]-map[a]});
    let color = 0;
    for (let i = 0; i < maxDegreeKeySorted.length; i++) {
        let node = parseInt(maxDegreeKeySorted[i]);
        let connected = this.graphAdj[node];
        for (let j = 0; j < connected.length; j++) {
            let cnode = connected[j];
            if(!this.nodeColors[cnode] || (this.nodeColors[cnode]==this.nodeColors[node] && this.nodeColors[cnode])){
                this.nodeColors[cnode] = colors[color]
                let node = document.getElementById(selector).querySelector(`.pp-node-${cnode}`);
                node.style.background = this.nodeColors[cnode];
                await sleep(1000);
            }
        }
        if(connected.length > 0) color++;
        console.log(connected, "connected");
    }

    // for (let i = 0; i < this.nodeColors.length; i++) {
    //     let node = document.getElementById(selector).querySelector(`.pp-node-${i}`);
    //     node.style.background = this.nodeColors[i];
        
    // }
    console.log(this.nodeColors, "sort");
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
