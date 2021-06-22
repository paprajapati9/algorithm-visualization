import mergesort from "./mergesort/mergesort"

export default function SortingViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
}

SortingViz.prototype.mergesort = mergesort;

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    return array;
}