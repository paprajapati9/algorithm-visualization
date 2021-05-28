let submitBotton = document.querySelector(".pp-form button[type='submit']");
submitBotton.addEventListener('click', (e)=>{
    e.preventDefault();
    let fromTower = document.querySelector(".pp-form input[name='fromTower']");
    let toTower = document.querySelector(".pp-form input[name='toTower']");
    console.log(fromTower, "fromTower");
    console.log(toTower, "toTower");
    let towers = {
        '1' : 'A',
        '2' : 'B',
        '3' : 'C'
    }
    removeDisks();
    addDisks(towers[fromTower.value]);
    let recursionViz = new algoviz.RecursionViz({
        selector: "pp-algoviz-selector",
        options: {
            from: fromTower.value,
            to: toTower.value,
            number: 3
        }
    });
    recursionViz.hanoi();
});

const removeDisks = () => {
    let disks = document.querySelectorAll(".pp-hanoi-tower-element");
    disks.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

const addDisks = (tower) => {
    let rod = document.querySelector(`.pp-hanoi-tower-rod.rod${tower}`);
    rod.innerHTML = `<div class="pp-hanoi-tower-element pp-hanoi-tower-element-3"></div>
    <div class="pp-hanoi-tower-element pp-hanoi-tower-element-2"></div>
    <div class="pp-hanoi-tower-element pp-hanoi-tower-element-1"></div>
    <p class="pp-hanoi-tower-name">Tower ${tower}</p>`;
}