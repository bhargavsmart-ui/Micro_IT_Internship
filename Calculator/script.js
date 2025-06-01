const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const toggleDark = document.getElementById('toggle-dark');

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear the display
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate and show result
function calculateResult() {
  try {
    // Replace ^ with Math.pow
    let expression = display.value.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
    let result = eval(expression);
    addToHistory(display.value, result);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

// Add calculation to history
function addToHistory(expression, result) {
  const li = document.createElement('li');
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li); // Add to top
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || "+-*/().".includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    calculateResult();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});

// Dark mode toggle
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
