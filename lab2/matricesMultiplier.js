class MatricesMultiplier {
  static multiply(m1, m2) {
    let result = [];
    for (let i = 0; i < m1.length; i++) {
      result[i] = [];
      for (let j = 0; j < m2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }
}

const m1 = [[2, 5], [1, -2]];
const m2 = [[3, -1], [7, 4]];

const result = MatricesMultiplier.multiply(m1, m2);
console.table(result);
