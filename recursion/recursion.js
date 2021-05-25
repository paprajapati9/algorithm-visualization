import hanoi from "./hanoiTower/hanoi"

export default function RecursionViz({selector, options={}}){
    this.selector = selector;
    this.options = options;
}

RecursionViz.prototype.hanoi = hanoi;