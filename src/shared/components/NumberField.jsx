import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import styles from '../styles/numberField.css';

const NumberField = forwardRef(({ number, max, onChange }, ref) => {
  const [selected, setSelected] = useState([]);

  useImperativeHandle(ref, () => ({
    setSelectedNumbers(numbers) {
      setSelected([...numbers]);
      onChange(numbers);
    },
  }));

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
});

export default NumberField;
