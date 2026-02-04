export function displayResult(result, resultSection, resultContent) {
  resultSection.classList.add('show');

  if (Array.isArray(result)) {
    const cols = result[0]?.length ?? 0;
    const matrixHtml = `
      <div class="matrix-grid" style="grid-template-columns: repeat(${cols}, 70px);">
        ${result.map(row =>
          row.map(val =>
            `<input type="text" class="matrix-input" value="${Number(val).toFixed(4)}" readonly>`
          ).join('')
        ).join('')}
      </div>
    `;
    resultContent.innerHTML = matrixHtml;
    return;
  }

  if (result?.value !== undefined) {
    resultContent.innerHTML = `
      <div style="font-size: 1.5rem; color: var(--accent-primary); text-align: center; padding: 20px;">
        ${typeof result.value === 'number' ? result.value.toFixed(6) : result.value}
      </div>
    `;
    return;
  }

  if (result?.vector) {
    resultContent.innerHTML = `
      <div style="color: var(--text-secondary);">
        [${result.vector.map(v => Number(v).toFixed(4)).join(', ')}]
      </div>
    `;
    return;
  }

  resultContent.innerHTML = `<div class="error-message">Unknown result format.</div>`;
}

export function displayError(message, resultSection, resultContent) {
  resultSection.classList.add('show');
  resultContent.innerHTML = `<div class="error-message">${message}</div>`;
}
