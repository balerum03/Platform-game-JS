const gameKey = 'X3rou6fMAmTLsB5x4fYQ';
const fetch = require('node-fetch');

export default {
  submitNameForm: (input) => {
    let username = input.value;
    if (username === '') {
      username = 'No name';
    }

    localStorage.setItem('username', username);
  },

  fetchScores: () => fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameKey}/scores`,
    { mode: 'cors' },
  ).then((response) => response.json()),

  submitScore: (username, score) => {
    fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameKey}/scores`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          score: score.toString(),
        }),
      },
    );
  },
};