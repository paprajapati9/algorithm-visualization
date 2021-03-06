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

function Graph(options, selector){

    this.nodesDegreeMap = Object();

    this.graphAdj = this.createRandomGraphAdj(options.size);
    console.log(this.graphAdj);

    this.totalNodes = this.graphAdj.length;

    this.regions = (this.totalNodes)*(this.totalNodes);

    this.nodesRegionMap = Array(this.totalNodes);

    this.nodePositions = Array(this.totalNodes);

    this.createNodeRegionMap(selector);
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

/**
 * Divide our viewport into s times the number of nodes and 
 * randomly assign a region to one node, draw the node at the mid 
 * of that region by calculating the x and y coordinates of the region
 * @param {String} selector : Id of the view container
 */
Graph.prototype.createNodeRegionMap = function(selector){
    let container = document.getElementById(selector);
    let cheight = container.clientHeight,
        clength = container.clientWidth,
        unit = Math.floor(Math.sqrt((clength*cheight)/this.regions)),
        rows = Math.ceil(cheight/unit),
        cols = Math.ceil(clength/unit),
        regions = Array(this.regions).fill().map((_, index) => index);

    this.regionsMatrix = Array(rows).fill().map(()=>Array(cols).fill(0));
    console.log(this.regionsMatrix, "regionsMatrix");
    for (let i = 0; i < this.totalNodes; i++) {
        let ranno = Math.floor((Math.random() * regions.length));
        console.log(ranno, "random");
        console.log(regions, "regions");
        let region = regions[ranno];
        console.log(region, "region");
        
        this.nodesRegionMap[i] = region;      
        
        let row = Math.floor(region/cols),
            col = Math.floor(region%cols),
            bounds = container.getClientRects()[0];
        let x = col*unit + parseInt(bounds.x) - 11,
            y = row*unit + parseInt(bounds.y) - 8;

        console.log(row, col);
        this.regionsMatrix[row][col] = i+1; //node number from 1
        regions = this.updateRegion(i, regions);
        
        const index = regions.indexOf(region);
        if(index) regions.splice(index, 1);

        let point = document.createElement('div');
        point.className = `pp-node-circle pp-node-${i}`;
        point.style.position = 'absolute';
        point.style.top = y+'px';
        point.style.left = x+'px';
        //console.log(point, "point");
        this.nodePositions[i] = [col*unit, row*unit];
        container.append(point);
    }
    console.log(this.nodePositions);
}

Graph.prototype.createView = function(selector){
    this.drawGraph(selector);
}

Graph.prototype.updateView = async function(selector){
    console.log(this, "this");
    let list = this.nodesDegreeMap;
    let obj = Object.keys(list).sort(
        function(a,b){
            return list[b]-list[a]
        }
    );
    console.log(obj);
}

Graph.prototype.updateRegion = function(node, regions){
    for (let i = 0; i < this.graphAdj[node].length; i++) {
        let startIndex, endIndex;
        let index1 = exists(this.regionsMatrix, node+1);
        let index2 = exists(this.regionsMatrix, this.graphAdj[node][i]+1);

        if(index2.length){
            
            if(index2[0] > index1[0]){
                startIndex = index1; endIndex = index2;
            }else if(index2[0] == index1[0]){
                if(index2[1] > index1[1]) {startIndex = index1; endIndex = index2;}
                else {startIndex = index2; endIndex = index1;}
            }else {startIndex = index2; endIndex = index1;}

            if(startIndex[0] == endIndex[0]){
                console.log("same row");
                let j = endIndex[1]-1;
                while(j > startIndex[1]){
                    this.regionsMatrix[startIndex[0]][j] = -1;
                    j--;
                }
            } //same row
            else if(startIndex[1] == endIndex[1]){
                console.log("same column");
                let j = endIndex[0]-1;
                while(j > startIndex[0]){
                    this.regionsMatrix[j][startIndex[0]] = -1;
                    j--;
                }
            } //same column
            else if(startIndex[1]-endIndex[1] == endIndex[0]-startIndex[0]){
                let k = endIndex[1]+1;
                let j = endIndex[0]-1;
                while(j > startIndex[0]){
                    this.regionsMatrix[j][k] = -1;
                    j--; k++;
                }
            } //opp diagonal
            else if(startIndex[1]-endIndex[1] == startIndex[0]-endIndex[0]){
                let k = endIndex[1]-1;
                let j = endIndex[0]-1;
                while(j > startIndex[0]){
                    this.regionsMatrix[j][k] = -1;
                    j--; k--;
                }
            } //main diagonal
        }
    }
    console.log(this.regionsMatrix, "regions after");
    regions = Array();

    for (let j = 0; j < this.regionsMatrix.length; j++) {
        for (let k = 0; k < this.regionsMatrix[j].length; k++) {
            if(this.regionsMatrix[j][k] == 0){
                let region = (this.regionsMatrix[j].length)*j + k;
                regions.push(region);
            }
        }
    }

    console.log(regions, "regions after cut");

    return regions;
}

function exists(arr, search) {
    //console.log(arr.length, "length");
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] == search){
                return [i, j];
            }
        }
    }
    return [];
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

Graph.prototype.drawGraph = function(selector){   
    let container = document.getElementById(selector);

    const canvas = container.querySelector("canvas");
    if (canvas.getContext) {
        //console.log("was inside");
        for (let i = 0; i < this.graphAdj.length; i++) {
            for (let j = 0; j < this.graphAdj[i].length; j++) {
                const ctx = canvas.getContext('2d');
                let connect = this.graphAdj[i][j];
                //console.log(i, "from");
                //console.log(connect, "to");
                drawLine(ctx, this.nodePositions[i], this.nodePositions[connect]);
            }
            
        }
    }
}


