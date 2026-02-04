import { state } from '../state/appState.js';

export function createMatrixGrid(container, r, c) {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${c}, 70px)`;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.step = '0.01';
      input.className = 'matrix-input';
      input.dataset.row = i;
      input.dataset.col = j;
      input.placeholder = '0';
      container.appendChild(input);
    }
  }
}

export function getMatrixValues(container) {
  const inputs = container.querySelectorAll('.matrix-input');
  const { rows, cols } = state;

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      const value = inputs[i * cols + j]?.value ?? '';
      matrix[i][j] = value === '' ? 0 : parseFloat(value);
    }
  }
  return matrix;
}
