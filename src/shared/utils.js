export function generateRandom(max, num, min = 1) {
  const arr = [];
  const res = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  for (let i = 0; i < num; i++) {
    res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
  return res;
}

export async function sendResults(first, second, isWon, counter = 1) {
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
  // eslint-disable-next-line no-console
  console.log(res);
  if (res.ok && res.status === 200) {
    // eslint-disable-next-line no-console
    console.log(await res.json());
  } else if (counter < 3) {
    counter += 1;
    setTimeout(sendResults(first, second, isWon, counter), 2 * 1000);
  } else {
    alert('Что-то пошло не так, попробуйте позже!'); // eslint-disable-line
  }
}

export function getWordNumber(number) {
  /* eslint-disable */
  switch (true) {
    case number <= 20 >= 11:
      return 'чисел';
    case number % 10 === 1:
      return 'число';
    case number % 10 === 2 || number % 10 === 3 || number % 10 === 4:
      return 'числа';
    default:
      return 'чисел';
  }
  /* eslint-enable */
}

export function countWinnerPoints(selected, winners) {
  let points = 0;
  for (let i = 0; i < selected.length; i++) {
    if (winners.includes(selected[i])) {
      points += 1;
    }
  }
  return points;
}
