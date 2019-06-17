// all possible directions
const allDirections = [
  { name: "down-right", vector: [1, 1] },
  { name: "down-left", vector: [1, -1] },
  { name: "up-left", vector: [-1, -1] },
  { name: "up-right", vector: [-1, 1] }
];

class DirectionRandomizer {
  static getRandDirection(direction) {
    // available 4 directions - for first direction draw
    let amount = 4;
    let availableDirections = [...allDirections];

    // available 3 directions - for case with Y
    if (direction !== undefined) {
      amount = 3;
      availableDirections = allDirections.filter(
        dir => dir.name !== direction.name
      );
    }

    let randNumber = Math.floor(Math.random() * amount);
    let newDirection = availableDirections[randNumber];
    return newDirection;
  }
}

module.exports = DirectionRandomizer;
