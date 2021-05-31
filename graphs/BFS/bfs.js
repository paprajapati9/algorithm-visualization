import style from "./bfs.css";

export default async function bfs(){
    let oldGraph = document.querySelector(".pp-graph-table");
    let graph = this.graph;
    if(oldGraph){
        oldGraph.parentNode.removeChild(oldGraph)
        graph = this.createGraph(this.selector, this.options);
    }
    console.log(graph, "graph");
    let visited = graph.visited;
    let parent = graph.parent;
    let graphAdj = graph.graphAdj;
    // let stack = new Stack(); 
    let queue = new Queue();
    let startRow = this.options.startRow,
        startCol = this.options.startCol,
        endRow = this.options.endRow,
        endCol = this.options.endCol;

    let startNode = graph.columns*startRow + startCol;
    let endNode = graph.columns*endRow + endCol;

    visited[startNode] = true;
    queue.enqueue(startNode); 

    let nodeOptions = {
        selector: this.selector,
        rows : graph.rows,
        columns : graph.columns,
        startNode : startNode,
        endNode : endNode
    }

    let path = Array();
    
    while (!queue.isEmpty()) {
        let visiting = queue.dequeue();
        await this.colorVisitingNode(visiting, nodeOptions);
        if(visiting == endNode){
            console.log("Found the endNode");
            break;
        }
        for (let j = 0; j < graphAdj[visiting].length; j++) {
            let indexJ = visiting + graphAdj[visiting][j];
            if ((graphAdj[visiting][j] != 0) && (visited[indexJ] === false)) {  
                visited[indexJ] = true;
                parent[indexJ] = visiting;
                queue.enqueue(indexJ);
            }
        }
    }
    let current = endNode;
    while(current > 0){
		path.push(current);
		current = parent[current];
	}
    path.reverse();
    console.log(path, "path");
    await this.colorShortestPath(path, nodeOptions);
}

function Queue() {
    this.queue = {};
    this.tail = 0;
    this.head = 0;
}
  
// Add an element to the end of the queue.
Queue.prototype.enqueue = function(element) {
    this.queue[this.tail++] = element;
    
}

Queue.prototype.isEmpty = function() {
    if (Object.keys(this.queue).length == 0) return 1;
    else return 0;
}
  
// Delete the first element of the queue.
Queue.prototype.dequeue = function() {
    if (this.tail === this.head)
        return undefined;
  
    const element = this.queue[this.head];
    delete this.queue[this.head++];
    return element;
}