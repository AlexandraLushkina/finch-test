import React from 'react';
import { useState, useRef } from 'react';
import NumberField from './NumberField';
import styles from './app.css';
import MagicWand from './assets/magicWand.svg';

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
    if (first.length < MAX_FIRST) {
      alert(`Выберите ${MAX_FIRST} чисел в первом поле`);
    } else if (second.length < MAX_SECOND) {
      alert(`Выберите ${MAX_SECOND} число во втором поле`);
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
      sendResults(first, second, isWon);
    }
  };

  const sendResults = async (first, second, isWon, counter = 1) => {
    const res = await fetch('http://localhost:3000/tickets-ok', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedNumber: {
          firstField: first,
          secondField: second,
        },
        isTicketWon: isWon,
      }),
    });
    console.log(res);
    if (res.ok && res.status === 200) {
      console.log(await res.json());
    } else if (counter < 3) {
      counter += 1;
      setTimeout(sendResults(first, second, isWon, counter), 2 * 1000);
    } else {
      alert('Что-то пошло не так, попробуйте позже!');
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

  const getWordNumber = (number) => {
    switch (true) {
      case 20 >= number >= 11:
        return 'чисел';
      case number % 10 === 1:
        return 'число';
      case number % 10 === 2 || number % 10 === 3 || number % 10 === 4:
        return 'числа';
      default:
        return 'чисел';
    }
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
            <span className={styles.secondHeader}>Поле 1</span> Отметьте{' '}
            {MAX_FIRST + ' ' + getWordNumber(MAX_FIRST)}.
          </p>
          <NumberField
            number={FIRST_NUMBERS}
            max={MAX_FIRST}
            onChange={setFirst}
            ref={firstRef}
          />
          <p className={styles.text}>
            <span className={styles.secondHeader}>Поле 2</span> Отметьте{' '}
            {MAX_SECOND + ' ' + getWordNumber(MAX_SECOND)}.
          </p>
          <NumberField
            number={SECOND_NUMBERS}
            max={MAX_SECOND}
            onChange={setSecond}
            ref={secondRef}
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
              : 'К сожалению, вы проиграли. Попробуйте еще раз!'}
          </p>
          <button className={styles.button} onClick={() => replay()}>
            <p className={styles.buttonText}>Повторить игру</p>
          </button>
        </div>
      )}
    </div>
  );
}
