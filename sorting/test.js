let sortingViz = new algoviz.SortingViz({
    selector: "pp-sorting-container",
    isReady: true, //////////
    options: {
        solve: false,
        size: 15,
        speed: 'fast'
    }
});

let mergesort = sortingViz.mergesort();
// console.log(mergesort);

let sortSize = document.querySelector(".pp-array-size");
sortSize.addEventListener("input", () => {
    // console.log("slider***",sortingViz.isReady);
    if(sortingViz.isReady)
    {
        let sortc = document.querySelector(".pp-array-view"); 
        console.log(sortc.childNodes)
        sortc.parentNode.removeChild(sortc);
        console.log(sortc.parentNode)

        sortingViz.options.size = parseInt(sortSize.value);
        mergesort = sortingViz.mergesort();
    }
})

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let speed = document.querySelector(".pp-viz-speed");
    // console.log('button*********',sortingViz.isReady);
    sortingViz.isReady = false; ////////////
    // console.log("*/************",sortingViz.isReady);

    mergesort.then(sortArray =>{
        // console.log(sortArray, "sort array");
        sortingViz.options.solve = true;
        sortingViz.options.array = sortArray.array;
        sortingViz.options.speed = speed.value;
        sortingViz.mergesort();
        // console.log("Ended*/************");

    });
});