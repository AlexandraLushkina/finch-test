import React, { useState, useRef } from 'react';
import NumberField from './NumberField';
import {
  generateRandom,
  sendResults,
  getWordNumber,
  countWinnerPoints,
} from '../utils';
import styles from '../styles/app.css';
import MagicWand from '../assets/magicWand.svg';

export default function AppComponent() {
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isWon, setIsWon] = useState();

  const FIRST_NUMBERS = 19;
  const SECOND_NUMBERS = 2;
  const MAX_FIRST = 8;
  const MAX_SECOND = 1;

  const firstRef = useRef();
  const secondRef = useRef();

  const checkNumbers = () => {
    if (first.length < MAX_FIRST) {
      alert(`Выберите ${MAX_FIRST} ${getWordNumber(MAX_FIRST)} в первом поле`); // eslint-disable-line
    } else if (second.length < MAX_SECOND) {
      alert(// eslint-disable-line
        `Выберите ${MAX_SECOND} ${getWordNumber(MAX_SECOND)} во втором поле`,
      );
    } else {
      const winnersFirst = generateRandom(FIRST_NUMBERS, MAX_FIRST);
      const winnersSecond = generateRandom(SECOND_NUMBERS, MAX_SECOND);

      const winnersPoint = {
        first: countWinnerPoints(first, winnersFirst),
        second: countWinnerPoints(second, winnersSecond),
      };

      // условия победы
      if (
        winnersPoint.first >= 4
        || (winnersPoint.first >= 3 && winnersPoint.second >= 1)
      ) {
        setIsWon(true);
      } else {
        setIsWon(false);
      }
      setIsPlaying(false);
      sendResults(first, second, isWon);
    }
  };

  const selectRandomNumbers = () => {
    const firstNumbers = generateRandom(FIRST_NUMBERS, MAX_FIRST);
    const secondNumbers = generateRandom(SECOND_NUMBERS, MAX_SECOND);

    firstRef.current.setSelectedNumbers(firstNumbers);
    secondRef.current.setSelectedNumbers(secondNumbers);
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
          <div className={styles.row}>
            <h1 className={styles.header}>Билет 1</h1>
            <MagicWand
              width={20}
              className={styles.icon}
              onClick={() => {
                selectRandomNumbers();
              }}
            />
          </div>
          <p className={styles.text}>
            <span className={styles.secondHeader}>Поле 1</span>
            {' '}
            Отметьте
            {' '}
            {`${MAX_FIRST} ${getWordNumber(MAX_FIRST)}`}
            .
          </p>
          <NumberField
            number={FIRST_NUMBERS}
            max={MAX_FIRST}
            onChange={setFirst}
            ref={firstRef}
          />
          <p className={styles.text}>
            <span className={styles.secondHeader}>Поле 2</span>
            {' '}
            Отметьте
            {' '}
            {`${MAX_SECOND} ${getWordNumber(MAX_SECOND)}`}
            .
          </p>
          <NumberField
            number={SECOND_NUMBERS}
            max={MAX_SECOND}
            onChange={setSecond}
            ref={secondRef}
          />
          <button type="button" className={styles.button} onClick={() => checkNumbers()}>
            <p className={styles.buttonText}>Показать результат</p>
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>Билет 1</h1>
          <p className={styles.text}>
            {isWon
              ? 'Ого, вы выиграли! Поздравляем!'
              : 'К сожалению, вы проиграли. Попробуйте еще раз!'}
          </p>
          <button type="button" className={styles.button} onClick={() => replay()}>
            <p className={styles.buttonText}>Повторить игру</p>
          </button>
        </div>
      )}
    </div>
  );
}
