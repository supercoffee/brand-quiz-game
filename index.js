const txtProductName = document.getElementById('txtProductName');
const txtResult = document.getElementById('txtResult');
const btnAmzn = document.getElementById('btnAmzn');
const btnDoc = document.getElementById('btnDoc');
const btnNext = document.getElementById('btnNext');
const txtScore = document.getElementById('txtScore');

const questions = [
    {name: 'Xdemvy', type: 'drug'},
    {name: 'Ubrelvy', type: 'drug'},
    {name: 'zepbound', type: "drug"},
    {name: 'opzelura', type: 'drug'},
    {name: 'ebglyss', type: 'drug'},
    {name: 'jadoal', type: "amzn"},
    {name: 'zyxel', type: "amzn"},
    {name: 'palksky', type: 'amzn'},
    {name: 'Ellasay', type: 'amzn'},
    {name: 'miradexic', type: 'amzn'},
    {name: 'fyndrax', type: 'amzn'},
];

const gameState = {
    score: 0,
    currentQuestion: null,
    usedQuestions: new Set(),
    currentGuess: null,
}

function advanceQuestion () {
    gameState.currentGuess = null;
    gameState.currentQuestion = questions.pop();
    btnNext.style.display = 'none';
    txtResult.style.display = 'none';
    btnAmzn.style.display = 'inline-block';
    btnDoc.style.display = 'inline-block';
    txtProductName.innerText = gameState.currentQuestion.name;
}

function revealAnswer() {
    if (gameState.currentGuess === gameState.currentQuestion.type) {
        txtResult.innerText = 'Correct!';
        gameState.score++;
    } else {
        txtResult.innerText = 'Wrong!';
        // todo: add more creative messages
    }
    txtResult.style.display = 'block';
    btnNext.style.display = 'inline-block';
    txtScore.innerText = gameState.score;
    btnAmzn.style.display = 'none';
    btnDoc.style.display = 'none';
}

function registerGuess(guess) {
    gameState.currentGuess = guess;
    revealAnswer();
}

function setupGame() {
    // Today I learned: Fisher-yates algorithm
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    btnAmzn.addEventListener('click', () => registerGuess('amzn'))
    btnDoc.addEventListener('click', () => registerGuess('drug'))
    btnNext.addEventListener('click', () => advanceQuestion());

    gameState.currentQuestion = questions.pop();
    txtProductName.innerText = gameState.currentQuestion.name;
    txtScore.innerText = gameState.score;
    txtResult.style.display = 'none';
    btnNext.style.display = 'none';
}

setupGame();
