import mergesort from "./mergesort/mergesort"
import style from "./sort.css"

export default function SortingViz({selector, options={}}){
    this.selector = selector;
    this.isReady = true; /////////
    this.options = options;
    this.generateSort = generateSort;
}

SortingViz.prototype.mergesort = mergesort;

const generateSort = (selector, options) => {
    // console.log(options, 'options');
    let sort = new Sort(options);
    sort.createView(selector);
    return sort;
}

function Sort(options){
    this.array = Array(options.size).fill().map((_, index) => index + 1);
    this.array.sort(() => Math.random() - 0.5);
    this.array.sort(() => Math.random() - 0.5); //shuffle array
}

Sort.prototype.createView = function(selector) {
    let container = document.getElementById(selector);
    // console.log("*********",selector)
    // console.log(this.array, "array");
    let arrayGraph = document.createElement('div');
    arrayGraph.className = 'pp-array-view';
    //let arrayGraphSort = document.createElement('div');
    //arrayGraphSort.className = 'pp-array-view-sort';
    for (let i = 0; i < this.array.length; i++) {
        let graphElement = document.createElement('div');
        let maxHeight = 300,
            maxWidth = container.clientWidth - 2*this.array.length;
        // console.log(maxWidth, "maxWidth");
        graphElement.className = 'pp-array-element';
        graphElement.setAttribute('data-value', this.array[i]);
        graphElement.style.height = (this.array[i]/this.array.length)*maxHeight+'px';
        graphElement.style.width = (maxWidth/this.array.length)+'px';
        arrayGraph.append(graphElement);
    }
    container.append(arrayGraph);
    //container.append(arrayGraphSort);
}