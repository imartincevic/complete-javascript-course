/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores;
let roundScore;
let activePlayer;

init();

let lastDice;

// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`;

// let x = document.querySelector(`#current-${activePlayer}`).textContent;
// console.log(`x = ${x}`);

document.querySelector('.btn-roll').addEventListener('click', function (params) {
    // get new roll, choose dice image based on rolled value
    const dice = Math.floor(Math.random() * 6) + 1;
    const diceDOM = document.querySelector('.dice');

    // display dice DOM
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;

    if (dice === 6 && lastDice === 6) {
        // player looses total score, next player rolls
        roundScore = 0;
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        switchPlayers();
    }
    // reset and change player in case active player rolled 1
    else if (dice !== 1) {
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
        roundScore = 0;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        switchPlayers();
    }
    
    lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function(params) {
    // store player's result to array and reset their round score
    // result needs to be added up to current score for the player
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`#current-${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= 100) {
        document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    } else {
        // switch players
        switchPlayers();
    }

    roundScore = 0;
});

document.querySelector('.btn-new').addEventListener('click', init);

function switchPlayers() {
    // change "active" indicator - toggle CSS class
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    lastDice = 0;
};

function init() {
    // reset scores, reset names, reset classList, hide dice
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';

    const scoreDisplays = document.querySelectorAll('.player-score');
    scoreDisplays.forEach(scoreDisplay => scoreDisplay.textContent = '0');

    const currentScoreDisplays = document.querySelectorAll('.player-current-score');
    currentScoreDisplays.forEach(scoreDisplay => scoreDisplay.textContent = '0');

    document.getElementById(`name-0`).textContent = 'PLAYER 1';
    document.getElementById(`name-1`).textContent = 'PLAYER 2';
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.querySelector(`.player-0-panel`).classList.add('active');
}

