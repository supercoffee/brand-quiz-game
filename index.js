const txtProductName = document.getElementById('txtProductName');
const txtResult = document.getElementById('txtResult');
const btnAmzn = document.getElementById('btnAmzn');
const btnDoc = document.getElementById('btnDoc');
const btnNext = document.getElementById('btnNext');
const txtScore = document.getElementById('txtScore');
const txtTotal = document.getElementById('txtTotal');

const questions = [
    {name: 'Xdemvy', type: 'drug'},
    {name: 'Ubrelvy', type: 'drug'},
    {name: 'zepbound', type: "drug"},
    {name: 'opzelura', type: 'drug'},
    {name: 'ebglyss', type: 'drug'},
    {name: 'wegovy', type: 'drug'},
    {name: 'airsupra', type: 'drug'},
    {name: 'skyrizi', type: 'drug'},
    {name: 'jadoal', type: "amzn"},
    {name: 'zyxel', type: "amzn"},
    {name: 'palksky', type: 'amzn'},
    {name: 'Ellasay', type: 'amzn'},
    {name: 'miradexic', type: 'amzn'},
    {name: 'fyndrax', type: 'amzn'},
    {name: 'austedo', type: 'drug'},
];

const amznSnark = [
    "I'd give this zero stars if I could because it burned my house down.",
    "Save 14% on Prime Day.",
    "Rated 4.9 stars by 4500 fake reviewers."
];

const drugSnark = [
    "Side effects include excess earwax production and uncontrollable flatulence",
    "Do not take this if you've recently been exposed to dog hair",
    "Clinical trials were rubber stamped by an overworked FDA official."
]

const gameState = {
    score: 0,
    currentQuestion: null,
    usedQuestions: new Set(),
    currentGuess: null,
}

function randomArrayIndex(arr) {
    return Math.floor(Math.random() * (arr.length))
}

function randomArrayItem(arr) {
    return arr[randomArrayIndex(arr)];
}

function advanceQuestion () {

    if (questions.length > 0) {
        gameState.currentGuess = null;
        gameState.currentQuestion = questions.pop();
        btnAmzn.style.display = 'inline-block';
        btnDoc.style.display = 'inline-block';
        txtProductName.innerText = gameState.currentQuestion.name;
    } else {
        txtProductName.innerText = 'Game over!';
    }
    txtResult.style.display = 'none';
    btnNext.style.display = 'none';

}

function revealAnswer() {
    if (gameState.currentGuess === gameState.currentQuestion.type) {
        txtResult.innerText = 'Correct!';
        gameState.score++;
    } else {
        if (gameState.currentQuestion.type === 'amzn') {
            txtResult.innerText = randomArrayItem(amznSnark)
        } else {
            txtResult.innerText = randomArrayItem(drugSnark)
        }
    }
    txtResult.style.display = 'block';
    btnNext.style.display = 'inline-block';
    txtScore.innerText = gameState.score;
    txtTotal.innerText = ''+ gameState.usedQuestions.size;
    btnAmzn.style.display = 'none';
    btnDoc.style.display = 'none';
}

function registerGuess(guess) {
    gameState.currentGuess = guess;
    gameState.usedQuestions.add(gameState.currentQuestion);
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
    txtTotal.innerText = ''+ gameState.usedQuestions.size;
    txtScore.innerText = gameState.score;
    txtResult.style.display = 'none';
    btnNext.style.display = 'none';
}

setupGame();
