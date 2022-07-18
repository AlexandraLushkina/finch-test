import React from 'react';
import { useState } from 'react';
import styles from './numberField.css';

export default function NumberField({ number, max, onChange }) {
  const [selected, setSelected] = useState([]);

  const toggleSelected = (number) => {
    const selectedIndex = selected.findIndex((x) => x === number);
    if (selectedIndex >= 0) {
      setSelected((prev) => {
        prev.splice(selectedIndex, 1);
        return [...prev];
      });
    } else {
      if (selected.length < max) {
        setSelected((prev) => {
          prev.push(number);
          return [...prev];
        });
      }
    }
    onChange(selected);
  };

  const renderNumbers = (number) => {
    const numbers = [];
    for (let i = 1; i <= number; i++) {
      let classNames = styles.card;
      if (selected.includes(i)) {
        classNames += ' ' + styles.cardSelected;
      }
      numbers.push(
        <button
          onClick={() => toggleSelected(i)}
          className={classNames}
          key={i}>
          <span className={styles.number}>{i}</span>
        </button>
      );
    }
    return numbers;
  };
  return <div className={styles.container}>{renderNumbers(number)}</div>;
}
