import mergesort from "./mergesort/mergesort"

export default function SortingViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
    this.generateSort = generateSort;
}

SortingViz.prototype.mergesort = mergesort;

const generateSort = (selector, options) => {
    console.log(options, 'options');
    let sort = new Sort(options);
    sort.createSortingBoard(selector);
    return sort;
}

function Sort(options){
    this.array = Array(options.size).fill().map((_, index) => index + 1);
    this.array.sort(() => Math.random() - 0.5);
    this.array.sort(() => Math.random() - 0.5); //shuffle array
}

Sort.prototype.createSortingBoard = function(selector) {
    let container = document.getElementById(selector);
    console.log(this.array, "array");
}