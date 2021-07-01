let sortingViz = new algoviz.SortingViz({
    selector: "pp-sorting-container",
    options: {
        solve: false,
        size: 30,
        speed: 'fast'
    }
});

let mergesort = sortingViz.mergesort();
console.log(mergesort);

let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let speed = document.querySelector(".pp-viz-speed");
    mergesort.then(sortArray =>{
        console.log(sortArray, "sort array");
        sortingViz.options.solve = true;
        sortingViz.options.array = sortArray.array;
        sortingViz.options.speed = speed.value;
        sortingViz.mergesort();
    });
});