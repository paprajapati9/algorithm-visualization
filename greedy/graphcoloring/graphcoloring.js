import style from "./graphcoloring.css";

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
    ctx.lineTo(begin[0] + r * Math.cos(theta), begin[0] + r * Math.sin(theta));
    ctx.lineTo(...end);
    ctx.stroke();
}

function Graph(options, selector){

    this.nodesDegreeMap = Object();

    this.graphAdj = this.createRandomGraphAdj(options.size);
    console.log(this.graphAdj);

    this.totalNodes = this.graphAdj.length;

    this.regions = (this.totalNodes)*(this.totalNodes);

    //this.createNodeRegionMap(selector);
}

Graph.prototype.drawGraph = function(selector){   
    let container = document.getElementById(selector);
    let radius = 50;
    let fixedAngle = 30, currentAngle = 30;

    const canvas = container.querySelector("canvas");
    if (canvas.getContext) {
        //console.log("was inside");
        for (let i = 0; i < this.graphAdj.length; i++) {
            for (let j = 0; j < this.graphAdj[i].length; j++) {
                const ctx = canvas.getContext('2d');
                let connect = this.graphAdj[i][j];
                let position = canvas.getBoundingClientRect();
                let xposition = (position.left + position.right)/2;
                let yposition = (position.top + position.bottom)/2;
                let center = [xposition, yposition];
                console.log(center, "center");
                drawLine(ctx, center, radius, currentAngle);
                currentAngle += fixedAngle;
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
