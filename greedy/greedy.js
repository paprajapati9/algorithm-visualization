import graphcoloring from "./graphcoloring/graphcoloring"

export default function GreedyViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
}

GreedyViz.prototype.graphcoloring = graphcoloring;