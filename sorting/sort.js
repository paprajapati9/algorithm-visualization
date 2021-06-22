import mergesort from "./mergesort/mergesort"

export default function SortingViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
}

SortingViz.prototype.mergesort = mergesort;