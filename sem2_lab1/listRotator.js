class Rotator {
  constructor(list, index) {
    this.list = list;
    this.index = index;
  }
  getRotatedList() {
    for (let i = 0; i < index; i++) {
      let firstElement = this.list[0];

      this.list.shift();
      this.list.push(firstElement);
    }
    return this.list;
  }
}

let list = [1, 2, 3, 4, 5, 6];
let index = 1; // rotates a list by k elements.

let rotator = new Rotator(list, index);
let rotatedList = rotator.getRotatedList();
console.log(rotatedList);
