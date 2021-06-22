export default async function mergesort(){
    if(this.options.solve){
        solveSort(this.selector, this.options);
    }else{
        return this.generateSort(this.selector, this.options);
    }
}

const solveSort = (selector, options) => {
    let mergesort = new MergeSort(options);
    console.log(mergesort, "mergesort");
}

function MergeSort(options){
    this.array = options.array;
}