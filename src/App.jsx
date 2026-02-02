import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
  const [display, setDisplay] = useState("");
  const [isResult, setIsResult] = useState(false);

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const operations = ["+", "-", "=", "C"];

  const handleDigitClick = (digit) => {
    if (isResult) {
      setDisplay(digit.toString());
      setIsResult(false);
    } else {
      setDisplay((prev) => prev + digit);
    }
  };

  const handleOperationClick = (op) => {
    if (op === "C") {
      setDisplay("");
      setIsResult(false);
      return;
    }

    if (op === "=") {
      try {
        const result = display
          .split(/([+-])/)
          .reduce((acc, curr) => {
            if (curr === "+") return acc;
            if (curr === "-") return acc;
            return acc !== "" ? acc + parseInt(curr, 10) : parseInt(curr, 10);
          }, 0);

        const sanitized = display.replace(/[^0-9+-]/g, "");
        const finalResult = Function(`return ${sanitized}`)();
        setDisplay(parseInt(finalResult, 10).toString());
        setIsResult(true);
      } catch {
        setDisplay("Error");
        setIsResult(true);
      }
      return;
    }

    if (isResult) {
      setIsResult(false);
    }

    if (display === "" && op === "-") {
      setDisplay("-");
      return;
    }

    const lastChar = display.slice(-1);
    if (lastChar === "+" || lastChar === "-") {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  return (
    <div className={styles.calculator}>
      <div
        className={styles.display}
        style={{ color: isResult ? "#e91e63" : "#222" }}
      >
        {display || "0"}
      </div>
      <div className={styles.buttons}>
        <div className={styles.numbers}>
          {digits.map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigitClick(digit)}
              className={styles.button}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className={styles.operations}>
          {operations.map((op) => (
            <button
              key={op}
              onClick={() => handleOperationClick(op)}
              className={styles.button}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


