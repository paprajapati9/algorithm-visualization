export default async function mergesort(){
    if(this.options.solve){
        document.body.classList.add("pp-sort-inprogress");
        await solveSort(this.selector, this.options);
        this.isReady=true;
        this.options.solve=false;
        document.body.classList.remove("pp-sort-inprogress");
    }else{
        return this.generateSort(this.selector, this.options);
    }
}

const solveSort = async (selector, options) => {
    let mergesort = new MergeSort(selector, options);
    //console.log(mergesort, "mergesort");
    await mergesort.sort(0, options.size-1);
    //console.log(mergesort, "mergesort");
}

function MergeSort(selector, options){
    this.array = options.array;
    this.selector = selector;
    this.speed = options.speed;/**/
    this.i = 0;
    // console.log(this.array, "this.array");
}

MergeSort.prototype.updateView = async function(start, sortedArr){
    let container = document.getElementById(this.selector);
    let sortContainer = container.querySelector(".pp-array-view");
    // console.log(container, "container");
    // console.log(sortedArr);
    // console.log(this.array, "this.array");
    let maxHeight = 300;

    let action_speed = [];
    if(this.speed=='fast')
    {
        action_speed.push("pp-active-sort-elment-fast");
        action_speed.push(100);
    }

    else if(this.speed=='medium')
    {
        action_speed.push("pp-active-sort-elment-medium");
        action_speed.push(400);
    }

    else if(this.speed=='slow')
    {
        action_speed.push("pp-active-sort-elment-slow");
        action_speed.push(800);
    }

    for (let i = 0; i < sortedArr.length; i++) {
        let el1 = sortContainer.childNodes[start];
        let value1 = el1.getAttribute('data-value');
        let el2 = container.querySelector(`.pp-array-element[data-value='${sortedArr[i]}']`);
        if(el1 != el2){
            el1.style.height = (sortedArr[i]/this.array.length)*maxHeight+'px';
            el2.style.height = (value1/this.array.length)*maxHeight+'px';
          
            /**/
            el1.classList.add(action_speed[0]);    
            el2.classList.add(action_speed[0]);
            /**/
    
            el2.setAttribute('data-value', value1);
            el1.setAttribute('data-value', sortedArr[i]);
            /**/
            await sleep(action_speed[1]);

            el1.classList.remove(action_speed[0]);
            el2.classList.remove(action_speed[0]);
            /**/
        }
        this.array[start] = sortedArr[i];
        start++;
    }
}

MergeSort.prototype.sort = async function(start, end){
    //console.log("here");
    if( start < end ) {
        let mid = parseInt((start + end ) / 2) ;           // defines the current array in 2 parts .
        await this.sort(start , mid ) ;                 // sort the 1st part of array .
        await this.sort(mid+1 , end ) ;              // sort the 2nd part of array.

        // merge the both parts by comparing elements of both the parts.
        this.i++;
        //if(this.i <= 4)
        await this.merge(start , mid , end );  
    } 
}  

MergeSort.prototype.merge = async function(start, mid, end){
    // console.log(this.array, "this.array after");
    let mergeArray = Array();
    // console.log(start, "start");
    // console.log(mid, "mid");
    // console.log(end, "end");
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

    while(ar1Index <= mid){
        mergeArray.push(this.array[ar1Index]);
        ar1Index++;
    }   
    
    while(ar2Index <= end){
        mergeArray.push(this.array[ar2Index]);
        ar2Index++;
    } 

    ar1Index = start;

    await this.updateView(start, mergeArray);

    // for (let i = 0; i < mergeArray.length; i++) {
    //     this.array[ar1Index] = mergeArray[i];
    //     ar1Index++;
    // }

    // console.log(mergeArray);

}

/**
 * 
 * @param {int} ms : time in milliseconds for which the program needs to be paused
 * @returns : A seTimeout promise that is resolved ms milliseconds later
 */
 function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}