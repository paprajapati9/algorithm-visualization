import style from "./dfs.css";

export default async function dfs(){
    if(!this.options.solve){
        return this.createView(this.selector, this.options);
    }
    let graph = this.options.graph;
    console.log(graph, "graph");
    this.updateView(this.selector, graph);

    let startRow = this.options.startRow,
        startCol = this.options.startCol,
        endRow = this.options.endRow,
        endCol = this.options.endCol;

    let startNode = graph.columns*startRow + startCol;
    let endNode = graph.columns*endRow + endCol;

    let nodeOptions = {
        selector: this.selector,
        rows : graph.rows,
        columns : graph.columns,
        startNode : startNode,
        endNode : endNode,
        colorVisitingNode : this.colorVisitingNode,
        colorShortestPath : this.colorShortestPath,
        speed : this.options.speed
    }

    solveDfs(graph, nodeOptions);
}

const solveDfs = async function(graph, options){

    let dfs = new DFS(graph, options)
    await dfs.solve(options.startNode, -1);

    let path = Array();
    
    let current = options.endNode;
    while(current > 0){
		path.push(current);
		current = dfs.parent[current];
	}
    path.reverse();
    console.log(path, "path");
    await options.colorShortestPath(path, options);
}

function DFS(graph, options) {
    this.graphAdj = graph.graphAdj;
    this.visited = graph.visited;
    this.parent = graph.parent;
    this.startNode = options.startNode;
    this.endNode = options.endNode;
    this.nodeFound = false;
    this.options = {
        colorVisitingNode : options.colorVisitingNode,
        colorShortestPath : options.colorShortestPath,
        speed : options.speed 
    }
    this.nodeOptions = {
        selector: options.selector,
        rows : options.rows,
        columns : options.columns,
        startNode : options.startNode,
        endNode : options.endNode,
    }
}
  
// Add an element to the end of the queue.
DFS.prototype.solve = async function(visiting, lastVisited) {
    // Mark the current node as visited and
    // print it
    console.log(visiting);
    this.visited[visiting] = true;
    this.parent[visiting] = lastVisited;
    if(visiting == this.endNode || this.nodeFound) {
        this.nodeFound = true;
        return;
    }
    await this.options.colorVisitingNode(visiting, this.nodeOptions, this.options.speed);
 
    // Recur for all the vertices adjacent
    // to this vertex
    // Right, Left, Up, Down
    for (let j = 0; j < this.graphAdj[visiting].length; j++) {
        let indexJ = visiting + this.graphAdj[visiting][j];
        console.log(indexJ, "indexJ");
        if ((this.graphAdj[visiting][j] != 0) && (this.visited[indexJ] === false)) {  
            await this.solve(indexJ, visiting);
        }
    }
    
}