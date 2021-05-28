import style from "./bfs.css";

export default async function bfs(){
    let graph = this.createGraph(this.selector, this.options);
    console.log(this, "graph");
    let visited = graph.visited;
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
    console.log(startNode, "startNode");
    console.log(endNode, "endNode");
    queue.enqueue(startNode); 
    console.log(queue, "queue");
    while (!queue.isEmpty()) {
        let visiting = queue.dequeue();
        console.log(visiting, "visiting");
        let visitingRow = parseInt(visiting/graph.columns);
        console.log(visitingRow, "visitingRow");
        if(visiting == endNode){
            console.log("Found the endNode");
            break;
        }
        console.log(`we visited ${visiting}`);
        for (let j = 0; j < graphAdj[visitingRow].length; j++) {
            let visitedJ = visitingRow*graph.columns + j;
            if ((graphAdj[visitingRow][j] === 1) && (visited[visitedJ] === false)) {  
                visited[visitedJ] = true;
                queue.enqueue(visitedJ);
            }
        }
        console.log(queue, "queue");
    }

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
    console.log(this);
    delete this.queue[this.head++];
    return element;
}