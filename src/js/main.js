import { state, setDims, setOperation } from './state/appState.js';
import { allOperations, getOperation } from './ops/catalog.js';
import { performTwoMatrixOperation, performScalarOperation, performSingleMatrixOperation } from './ops/dispatcher.js';
import { el } from './ui/dom.js';
import { createMatrixGrid, getMatrixValues } from './ui/matrixGrid.js';
import { displayResult, displayError } from './ui/renderResults.js';

function updateMatrixGrid() {
  const rows = parseInt(el.rows().value, 10);
  const cols = parseInt(el.cols().value, 10);
  setDims(rows, cols);

  createMatrixGrid(el.matrixA(), rows, cols);

  const op = getOperation(state.currentOperation);
  if (op?.needsSecondMatrix) {
    createMatrixGrid(el.matrixB(), rows, cols);
  }
}

function filterOperations() {
  const searchTerm = el.searchInput().value.toLowerCase();
  const listContainer = el.operationList();

  if (searchTerm === '') {
    listContainer.classList.remove('show');
    return;
  }

  const filtered = allOperations.filter(op => op.name.toLowerCase().includes(searchTerm));

  listContainer.innerHTML = '';
  filtered.forEach(op => {
    const item = document.createElement('div');
    item.className = 'operation-item';
    item.textContent = op.name;
    item.addEventListener('click', () => selectOperation(op.id));
    listContainer.appendChild(item);
  });

  listContainer.classList.add('show');
}

function selectOperation(opId) {
  setOperation(opId);
  const operation = getOperation(opId);

  // Quick buttons active state
  el.quickButtons().forEach(btn => {
    btn.classList.toggle('active', btn.dataset.op === opId);
  });

  // Matrix B show/hide
  if (operation?.needsSecondMatrix) {
    el.matrixBContainer().classList.add('show');
    createMatrixGrid(el.matrixB(), state.rows, state.cols);
  } else {
    el.matrixBContainer().classList.remove('show');
  }

  // Scalar show/hide
  if (operation?.needsScalar) el.scalarSection().classList.add('show');
  else el.scalarSection().classList.remove('show');

  // Hide search results
  el.operationList().classList.remove('show');
  el.searchInput().value = '';
}

function executeOperation() {
  if (!state.currentOperation) {
    alert('Please select an operation first');
    return;
  }

  const operation = getOperation(state.currentOperation);
  const A = getMatrixValues(el.matrixA());

  try {
    let result;

    if (operation?.needsSecondMatrix) {
      const B = getMatrixValues(el.matrixB());
      result = performTwoMatrixOperation(state.currentOperation, A, B);
    } else if (operation?.needsScalar) {
      const scalar = parseFloat(el.scalarValue().value);
      result = performScalarOperation(state.currentOperation, A, scalar);
    } else {
      result = performSingleMatrixOperation(state.currentOperation, A);
    }

    displayResult(result, el.resultSection(), el.resultContent());
  } catch (err) {
    displayError(err.message ?? String(err), el.resultSection(), el.resultContent());
  }
}

function setupEventListeners() {
  el.rows().addEventListener('change', updateMatrixGrid);
  el.cols().addEventListener('change', updateMatrixGrid);
  el.searchInput().addEventListener('input', filterOperations);
  el.executeButton().addEventListener('click', executeOperation);

  el.quickButtons().forEach(btn => {
    btn.addEventListener('click', () => selectOperation(btn.dataset.op));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // initial state
  setDims(parseInt(el.rows().value, 10), parseInt(el.cols().value, 10));
  createMatrixGrid(el.matrixA(), state.rows, state.cols);
  setupEventListeners();
});
