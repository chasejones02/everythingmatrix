import {
  matrixAdd,
  matrixSubtract,
  matrixMultiply,
  hadamardProduct,
  scalarMultiply,
  matrixPower,
  elementPower,
  transpose,
  rref,
  ref,
  determinant,
  trace,
  rank,
  inverse,
  isSymmetric,
  getDiagonal,
  upperTriangular,
  lowerTriangular,
  frobeniusNorm
} from './matrixOps.js';

export function performTwoMatrixOperation(op, A, B) {
  switch (op) {
    case 'addition': return matrixAdd(A, B);
    case 'subtraction': return matrixSubtract(A, B);
    case 'multiplication': return matrixMultiply(A, B);
    case 'hadamard': return hadamardProduct(A, B);
    default: throw new Error('Operation not implemented');
  }
}

export function performScalarOperation(op, A, scalar) {
  switch (op) {
    case 'scalar_mult': return scalarMultiply(A, scalar);
    case 'matrix_power': return matrixPower(A, Math.round(scalar));
    case 'element_power': return elementPower(A, scalar);
    default: throw new Error('Operation not implemented');
  }
}

export function performSingleMatrixOperation(op, A) {
  switch (op) {
    case 'transpose': return transpose(A);
    case 'rref': return rref(A);
    case 'ref': return ref(A);
    case 'determinant': return { value: determinant(A) };
    case 'trace': return { value: trace(A) };
    case 'rank': return { value: rank(A) };
    case 'inverse': return inverse(A);
    case 'is_symmetric': return { value: isSymmetric(A) ? 'Yes' : 'No' };
    case 'diagonal': return { vector: getDiagonal(A) };
    case 'upper_triangular': return upperTriangular(A);
    case 'lower_triangular': return lowerTriangular(A);
    case 'frobenius_norm': return { value: frobeniusNorm(A) };
    default: throw new Error('Operation not yet implemented');
  }
}
