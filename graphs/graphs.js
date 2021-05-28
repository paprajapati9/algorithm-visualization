import bfs from "./BFS/bfs"

export default function GraphsViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
    this.createGraph = createGraph;
}

GraphsViz.prototype.bfs = bfs;

const createGraph = (selector, options) => {
    let graphContainer = document.getElementById(selector);
    let table = document.createElement('table'),
        height = graphContainer.clientHeight,
        width = graphContainer.clientWidth;
    const trElements = height/25, //create boxes of 25X25
        tdElements = width/25;

    table.setAttribute("rules", "all");

    for (let trel = 0; trel < trElements; trel++) {
        let tr = document.createElement('tr');
        for (let tdel = 0; tdel < tdElements; tdel++) {
            let td = document.createElement('td');
            td.setAttribute('colspan', 1);
            tr.append(td);
        }
        table.append(tr);
    }
    graphContainer.append(table);
}