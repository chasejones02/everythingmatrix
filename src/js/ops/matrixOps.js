export function matrixAdd(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

export function matrixSubtract(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

export function scalarMultiply(A, scalar) {
  return A.map(row => row.map(val => val * scalar));
}

export function matrixMultiply(A, B) {
  if (A[0].length !== B.length) {
    throw new Error('Invalid dimensions for multiplication');
  }
  const result = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

export function hadamardProduct(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Matrices must have the same dimensions');
  }
  return A.map((row, i) => row.map((val, j) => val * B[i][j]));
}

export function transpose(A) {
  return A[0].map((_, i) => A.map(row => row[i]));
}

export function rref(A) {
  const matrix = A.map(row => [...row]);
  const rows = matrix.length;
  const cols = matrix[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
    if (lead >= cols) return matrix;

    let i = r;
    while (Math.abs(matrix[i][lead]) < 1e-10) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols) return matrix;
      }
    }

    [matrix[i], matrix[r]] = [matrix[r], matrix[i]];

    const lv = matrix[r][lead];
    matrix[r] = matrix[r].map(val => val / lv);

    for (let ii = 0; ii < rows; ii++) {
      if (ii !== r) {
        const lv2 = matrix[ii][lead];
        matrix[ii] = matrix[ii].map((val, j) => val - lv2 * matrix[r][j]);
      }
    }
    lead++;
  }

  return matrix;
}

export function ref(A) {
  const matrix = A.map(row => [...row]);
  const rows = matrix.length;
  const cols = matrix[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
    if (lead >= cols) return matrix;

    let i = r;
    while (Math.abs(matrix[i][lead]) < 1e-10) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols) return matrix;
      }
    }

    [matrix[i], matrix[r]] = [matrix[r], matrix[i]];

    const lv = matrix[r][lead];
    matrix[r] = matrix[r].map(val => val / lv);

    for (let ii = r + 1; ii < rows; ii++) {
      const lv2 = matrix[ii][lead];
      matrix[ii] = matrix[ii].map((val, j) => val - lv2 * matrix[r][j]);
    }
    lead++;
  }

  return matrix;
}

export function determinant(A) {
  const n = A.length;
  if (n !== A[0].length) throw new Error('Matrix must be square');
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    const minor = A.slice(1).map(row => row.filter((_, i) => i !== j));
    det += Math.pow(-1, j) * A[0][j] * determinant(minor);
  }
  return det;
}

export function trace(A) {
  if (A.length !== A[0].length) throw new Error('Matrix must be square');
  return A.reduce((sum, row, i) => sum + row[i], 0);
}

export function rank(A) {
  const rr = rref(A);
  return rr.filter(row => row.some(val => Math.abs(val) > 1e-10)).length;
}

export function inverse(A) {
  const n = A.length;
  if (n !== A[0].length) throw new Error('Matrix must be square');

  const det = determinant(A);
  if (Math.abs(det) < 1e-10) throw new Error('Matrix is singular (non-invertible)');

  const augmented = A.map((row, i) => [
    ...row,
    ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
  ]);
  const rrefAug = rref(augmented);
  return rrefAug.map(row => row.slice(n));
}

export function matrixPower(A, n) {
  if (A.length !== A[0].length) throw new Error('Matrix must be square');
  if (n === 0) return A.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
  if (n === 1) return A;

  let result = A;
  for (let i = 1; i < n; i++) result = matrixMultiply(result, A);
  return result;
}

export function elementPower(A, power) {
  return A.map(row => row.map(val => Math.pow(val, power)));
}

export function isSymmetric(A) {
  if (A.length !== A[0].length) return false;
  for (let i = 0; i < A.length; i++) {
    for (let j = i + 1; j < A.length; j++) {
      if (Math.abs(A[i][j] - A[j][i]) > 1e-10) return false;
    }
  }
  return true;
}

export function getDiagonal(A) {
  const n = Math.min(A.length, A[0].length);
  return Array(n).fill(0).map((_, i) => A[i][i]);
}

export function upperTriangular(A) {
  return A.map((row, i) => row.map((val, j) => (j >= i ? val : 0)));
}

export function lowerTriangular(A) {
  return A.map((row, i) => row.map((val, j) => (j <= i ? val : 0)));
}

export function frobeniusNorm(A) {
  return Math.sqrt(
    A.reduce(
      (sum, row) => sum + row.reduce((rowSum, val) => rowSum + val * val, 0),
      0
    )
  );
}
