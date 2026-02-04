export const state = {
  rows: 3,
  cols: 3,
  currentOperation: null
};

export function setDims(rows, cols) {
  state.rows = rows;
  state.cols = cols;
}

export function setOperation(opId) {
  state.currentOperation = opId;
}
