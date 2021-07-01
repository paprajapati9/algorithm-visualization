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
    mergesort.sort(0, options.size-1);
    console.log(mergesort, "mergesort");
}

function MergeSort(options){
    this.array = options.array;
    console.log(this.array, "this.array");
}

MergeSort.prototype.updateView = function(){

}

MergeSort.prototype.sort = function(start, end){
    console.log("here");
    if( start < end ) {
        let mid = parseInt((start + end ) / 2) ;           // defines the current array in 2 parts .
        this.sort(start , mid ) ;                 // sort the 1st part of array .
        this.sort(mid+1 , end ) ;              // sort the 2nd part of array.

        // merge the both parts by comparing elements of both the parts.
        this.merge(start , mid , end );  
    } 
}  

MergeSort.prototype.merge = function(start, mid, end){
    console.log(this.array, "this.array after");
    let mergeArray = Array();
    console.log(start, "start");
    console.log(mid, "mid");
    console.log(end, "end");
    let ar1Index = start,
        ar2Index = mid+1;
    while(ar1Index <= mid && ar2Index <= end){
        if(this.array[ar1Index] <= this.array[ar2Index]){
            mergeArray.push(this.array[ar1Index]);
            ar1Index++;
        }else{
            mergeArray.push(this.array[ar2Index]);
            ar2Index++;
        } 
    }

    console.log(mergeArray);


    while(ar1Index <= mid){
        mergeArray.push(this.array[ar1Index]);
        ar1Index++;
    }   
    
    while(ar2Index <= end){
        mergeArray.push(this.array[ar2Index]);
        ar2Index++;
    } 

    ar1Index = start;
    for (let i = 0; i < mergeArray.length; i++) {
        this.array[ar1Index] = mergeArray[i];
        ar1Index++;
    }

    console.log(mergeArray);

}