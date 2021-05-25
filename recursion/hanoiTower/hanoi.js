import style from "./hanoi.css";

export default async function hanoi(){
    let options = this.options,
        initTower = [], //initial tower array
        diskNumber = options.number || 3, //number of disks
        selector = this.selector; //id of the main container

    for (let i = 0; i < diskNumber; i++) {
        initTower.push(i+1); //put all disks in the from tower
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

    let auxRod = 6 - options.from - options.to; //setting auxillary tower
    towerRods[towers[options.from]] = initTower; 
    console.log(towerRods);
    await towerOfHanoi(diskNumber, towers[options.from], towers[options.to], towers[auxRod], towerRods, selector);
}

/**
 * Recursive async function to solve hanoi tower problem
 * @param {int} diskNumber : number of disks in tower
 * @param {char} fromRod : tower from where the disk needs to be moved from
 * @param {char} toRod : tower to which the disk needs to be moved to
 * @param {char} auxRod : left tower
 * @param {Array} towerRods : current towers condition array
 * @param {string} selector : id of main container
 */
async function towerOfHanoi(diskNumber, fromRod, toRod, auxRod, towerRods, selector){
    if(diskNumber == 1){
        let display = `Move disk 1 from rod ${fromRod} to rod ${toRod}`;
        await sleep(2000); // pause the program for 2s after every move
        updateRodElements(towerRods, fromRod, toRod, diskNumber, selector); //update disks on DOM after every move
        console.log(display, towerRods);
        return;
    }
    await towerOfHanoi(diskNumber-1, fromRod, auxRod, toRod, towerRods, selector);
    let display = `Move disk ${diskNumber} from rod ${fromRod} to rod ${toRod}`;
    await sleep(2000); // pause the program for 2s after every move
    updateRodElements(towerRods, fromRod, toRod, diskNumber, selector); //update disks on DOM after every move
    console.log(display, towerRods);
    await towerOfHanoi(diskNumber-1, auxRod, toRod, fromRod, towerRods, selector);
}

/**
 * Updates the disks in the DOM seen by user and the towerRods array
 * @param {Array} towerRods : current status of disks in towers
 * @param {int} fromRod : tower from where the disk needs to be moved from
 * @param {int} toRod : tower to which the disk needs to be moved to
 * @param {int} diskNumber : disk to be moved currently
 * @param {string} selector : id of main container
 * @returns {Array} towerRods : Updated towerRods array after moving disks
 */
function updateRodElements(towerRods, fromRod, toRod, diskNumber, selector){
    towerRods[toRod].push(diskNumber);
    const indexOfDisk = towerRods[fromRod].indexOf(diskNumber);
    if (indexOfDisk > -1) {
        towerRods[fromRod].splice(indexOfDisk, 1);
    }
    
    let container = document.getElementById(selector),
        frod = container.querySelector(`.rod${fromRod}`),
        trod = container.querySelector(`.rod${toRod}`);

    const disk = frod.querySelector(`.pp-hanoi-tower-element-${diskNumber}`);
    trod.appendChild(disk);
    return towerRods;

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