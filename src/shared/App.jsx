import React from 'react';
import { useState } from 'react';
import NumberField from './NumberField';
import styles from './app.css';

export default function AppComponent() {
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isWon, setIsWon] = useState();

  const FIRST_NUMBERS = 19;
  const SECOND_NUMBERS = 2;
  const MAX_FIRST = 8;
  const MAX_SECOND = 1;

  function generateRandom(max, num, min = 1) {
    const arr = [],
      res = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    for (let i = 0; i < num; i++) {
      res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    return res;
  }

  const countWinnerPoints = (selected, winners) => {
    let points = 0;
    for (let i = 0; i < selected.length; i++) {
      if (winners.includes(selected[i])) {
        points += 1;
      }
    }
    return points;
  };

  const checkNumbers = () => {
    if (first.length < 8) {
      alert('Выберите 8 чисел в первом поле');
    } else if (second.length < 1) {
      alert('Выберите 1 число во втором поле');
    } else {
      const winnersFirst = generateRandom(FIRST_NUMBERS, MAX_FIRST);
      const winnersSecond = generateRandom(SECOND_NUMBERS, MAX_SECOND);

      const winnersPoint = {
        first: countWinnerPoints(first, winnersFirst),
        second: countWinnerPoints(second, winnersSecond),
      };

      // условия победы
      if (
        winnersPoint.first >= 4 ||
        (winnersPoint.first >= 3 && winnersPoint.second >= 1)
      ) {
        setIsWon(true);
      } else {
        setIsWon(false);
      }
      setIsPlaying(false);
    }
  };

  const replay = () => {
    setFirst([]);
    setSecond([]);
    setIsWon();
    setIsPlaying(true);
  };

  return (
    <div style={{ height: '100vh' }} className={styles.gradient}>
      {isPlaying ? (
        <div className={styles.container}>
          <h1 className={styles.header}>Билет 1</h1>
          <p className={styles.text}>
            <span className={styles.secondHeader}>Поле 1</span> Отметьте 8
            чисел.
          </p>
          <NumberField
            number={FIRST_NUMBERS}
            max={MAX_FIRST}
            onChange={setFirst}
          />
          <p className={styles.text}>
            <span className={styles.secondHeader}>Поле 2</span> Отметьте 1
            число.
          </p>
          <NumberField
            number={SECOND_NUMBERS}
            max={MAX_SECOND}
            onChange={setSecond}
          />
          <button className={styles.button} onClick={() => checkNumbers()}>
            <p className={styles.buttonText}>Показать результат</p>
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>Билет 1</h1>
          <p className={styles.text}>
            {isWon
              ? 'Ого, вы выиграли! Поздравляем!'
              : 'К сожалению, вы програли. Попробуйте еще раз!'}
          </p>
          <button className={styles.button} onClick={() => replay()}>
            <p className={styles.buttonText}>Повторить игру</p>
          </button>
        </div>
      )}
    </div>
  );
}