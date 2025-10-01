 const display = document.getElementById('display');
    let current = '0';
    let previous = '0';
    let operator = null;

    function updateDisplay() {
      display.textContent = current;
    }

    function calculate() {
      const prev = parseFloat(previous);
      const curr = parseFloat(current);

      if (isNaN(prev) || isNaN(curr)) return;

      switch (operator) {
        case '+': current = (prev + curr).toString(); break;
        case '-': current = (prev - curr).toString(); break;
        case '*': current = (prev * curr).toString(); break;
        case '/': current = curr === 0 ? 'Error' : (prev / curr).toString(); break;
      }

      operator = null;
      previous = '';
    }

    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value) || value === '.') {
          if (current === '0' && value !== '.') {
            current = value;
          } else if (value === '.' && current.includes('.')) {
            return;
          } else {
            current += value;
          }
        } else if (value === 'AC') {
          current = '0';
          previous = '';
          operator = null;
        } else if (value === '+/-') {
          current = ((current) * -1).toString();
        } else if (value === '%') {
          current = (parseFloat(current) / 100).toString();
        } else if (value === '=') {
          if (operator !== null) {
            calculate();
          }
        } else {
          if (operator !== null) {
            calculate();
          }
          operator = value;
          previous = current;
          current = '0';
        }

        updateDisplay();
      });
    });

    updateDisplay();