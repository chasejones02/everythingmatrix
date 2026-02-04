export const allOperations = [
  { name: 'Addition', id: 'addition', needsSecondMatrix: true },
  { name: 'Subtraction', id: 'subtraction', needsSecondMatrix: true },
  { name: 'Scalar Multiplication', id: 'scalar_mult', needsScalar: true },
  { name: 'Matrix Multiplication', id: 'multiplication', needsSecondMatrix: true },
  { name: 'Element-wise (Hadamard) Multiplication', id: 'hadamard', needsSecondMatrix: true },
  { name: 'Matrix Powers', id: 'matrix_power', needsScalar: true },
  { name: 'Element-wise Powers', id: 'element_power', needsScalar: true },
  { name: 'Transpose', id: 'transpose' },
  { name: 'Conjugate Transpose', id: 'conjugate_transpose' },
  { name: 'Row Echelon Form', id: 'ref' },
  { name: 'Reduced Row Echelon Form (RREF)', id: 'rref' },
  { name: 'Matrix Inverse', id: 'inverse' },
  { name: 'Determinant', id: 'determinant' },
  { name: 'Trace', id: 'trace' },
  { name: 'Rank', id: 'rank' },
  { name: 'Eigenvalues', id: 'eigenvalues' },
  { name: 'Eigenvectors', id: 'eigenvectors' },
  { name: 'Singular Value Decomposition (SVD)', id: 'svd' },
  { name: 'LU Factorization', id: 'lu' },
  { name: 'QR Factorization', id: 'qr' },
  { name: 'Cholesky Factorization', id: 'cholesky' },
  { name: 'Null Space', id: 'null_space' },
  { name: 'Column Space', id: 'column_space' },
  { name: 'Row Space', id: 'row_space' },
  { name: 'Gram-Schmidt Orthogonalization', id: 'gram_schmidt' },
  { name: 'Frobenius Norm', id: 'frobenius_norm' },
  { name: 'Condition Number', id: 'condition_number' },
  { name: 'Symmetry Test', id: 'is_symmetric' },
  { name: 'Diagonal Extraction', id: 'diagonal' },
  { name: 'Upper Triangular', id: 'upper_triangular' },
  { name: 'Lower Triangular', id: 'lower_triangular' }
];

export function getOperation(opId) {
  return allOperations.find(op => op.id === opId) ?? null;
}
