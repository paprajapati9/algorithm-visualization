import style from "./hanoi.css";

export default async function hanoi(){
    let options = this.options;
    var number = options.number || 3;
    let initTower = [];
    let container = document.getElementById(selector);
    for (let i = 0; i < number; i++) {
        initTower.push(i+1); 
    }

    let towers = {
        '1' : 'A',
        '2' : 'B',
        '3' : 'C'
    }

    let towerRods = {
        'A' : [],
        'B' : [],
        'C' : []
    }

    let auxRod = 6 - options.from - options.to;
    towerRods[towers[options.from]] = initTower;
    console.log(towerRods);
    var selector = this.selector;
    await towerOfHanoi(number, towers[options.from], towers[options.to], towers[auxRod], towerRods, selector);
}

async function towerOfHanoi(number, fromRod, toRod, auxRod, towerRods, selector){
    if(number == 1){
        let display = `Move disk 1 from rod ${fromRod} to rod ${toRod}`;
        await sleep(2000);
        updateRodElements(towerRods, fromRod, toRod, number, selector);
        console.log(display, towerRods);
        return;
    }
    await towerOfHanoi(number-1, fromRod, auxRod, toRod, towerRods, selector);
    let display = `Move disk ${number} from rod ${fromRod} to rod ${toRod}`;
    await sleep(2000);
    updateRodElements(towerRods, fromRod, toRod, number, selector);
    console.log(display, towerRods);
    await towerOfHanoi(number-1, auxRod, toRod, fromRod, towerRods, selector);
}

function updateRodElements(towerRods, fromRod, toRod, number, selector){
    towerRods[toRod].push(number);
    const index = towerRods[fromRod].indexOf(number);
    if (index > -1) {
        towerRods[fromRod].splice(index, 1);
    }
    
    let container = document.getElementById(selector);
    let frod = container.querySelector(`.rod${fromRod}`);
    let trod = container.querySelector(`.rod${toRod}`);
    const el = frod.querySelector(`.pp-hanoi-tower-element-${number}`);
    trod.appendChild(el);
    return towerRods;

}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}