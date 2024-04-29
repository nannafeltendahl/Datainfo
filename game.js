// ------------------------ Event Registration --------------------

// on page load
document.addEventListener('DOMContentLoaded', function () {
    log("Page loaded")
    gameState.resetGame();
});

//detecting keyboard press
document.addEventListener("keydown", function (event) {
    gameState.checkAnswer(event.key);
});

const states = {
    Start: "Start",
    Question: "Question",
    Caught: "Caught",
    Shield: "Shield",
    ShieldGold: "ShieldGold",
    GameOver: "GameOver",
}

const questions = //This a const (unchangeable) variable with variable inside which have a value that is a string
    [
        {
            questionText: "Hvilken URL tror du er troværdig?",
            answerA: "A: https://www.borger.dk",
            answerB: "B: http://www.borger.dk",
            correctAnswer: "a",
        },
        {
            questionText: "Hvad er en sikker måde at identificere en legitim hjemmeside, når du indtaster følsomme oplysninger?",
            answerA: "A: Tilgå en hjemmeside gennem et link eller en sponsorede annonce",
            answerB: "B: Kontrollér, om webadressen starter med https: og viser en hængelåsikon i adressefeltet.",
            correctAnswer: "b",
        },
        {
            questionText: "a is correct",
            answerA: "",
            answerB: "",
            correctAnswer: "a",
        },
    ]

// ---------------------- Game State -----------------------
let gameState = { // dette er en variable med navnet gameState, som indeholder nogle forskellige variable med en værdi og nogle funktioner
    results: null,
    currentQuestionIndex: 0, //variable with a value
    currentQuestion: null, //variable with a value of null
    state: states.Start,

    setState: function (state) {
        this.state = state;
        this.updateGamePagesShown();
    },
    resetGame: function () { //this is a function called resetGame, that takes og calls for the variables from gameState through a this.
        this.setGameQuestion(0);
        this.results = Array(questions.length).fill(false)
        this.setState(states.Start);
    },
    updateGamePagesShown: function () {
        // start by hiding all
        document.querySelectorAll(".gamePage").forEach(gamePageElement => gamePageElement.style.display = 'none');

        // display only one game page depending on state
        switch (this.state) {
            case "Question":
                document.getElementById("questionPage").style.display = 'grid';
                break;
            case "Caught":
                document.getElementById("caughtPage").style.display = 'grid';
                break;
            case "Shield":
                document.getElementById("shieldPage").style.display = 'grid';
                break;
            case "ShieldGold":
                document.getElementById("shieldGoldPage").style.display = 'grid';
                break;
            case "GameOver":
                document.getElementById("gameOverPage").style.display = 'grid';
                break;

            default:
                document.getElementById("startPage").style.display = 'grid';
                break;

        }
    },
    setGameQuestion: function (questionIndex) { //dette er en function med navnet setGameQuestion, med variablen questionIndex
        // set question with given index
        this.currentQuestionIndex = questionIndex; //
        this.currentQuestion = questions[this.currentQuestionIndex] //current question is equal to questions with the input from questionIndex above

        document.getElementById("gameQuestion").innerHTML = this.currentQuestion.questionText;
        document.getElementById("gameQuestionOptionA").innerHTML = this.currentQuestion.answerA;
        document.getElementById("gameQuestionOptionB").innerHTML = this.currentQuestion.answerB;
    },
    setNextQuestion: function () {
        if (this.currentQuestionIndex + 1 >= questions.length) { // if currentQuestionIndex + 1 is equal or even with  question then change inner html to yaay plus show a image.
            // it looks for the end of question with the .length
            // TODO: show game completed...
            let score = 0;
            for (let i = 0; i < this.results.length; i++) {
                if (this.results[i] === true) {
                    score++;
                }
            }
            log("The final score was: " + score);
            if (score === this.results.length) {
                // let questionDivElement = document.getElementById("question");
                // questionDivElement.innerHTML = "YAAAY!<img src='image/goldFishLogo.png' />";
                this.setState(states.ShieldGold);
            } else {
                // TODO: you got this many out of x correct, try again / restart game
                this.setState(states.GameOver);
            }
        } else {
            this.setGameQuestion(this.currentQuestionIndex + 1); // if not the above is the case, then set the + 1 to the currentQuestionIndex
            this.setState(states.Question);
        }
    },
    checkAnswer: function (answerGiven) {
        let wasCorrect = this.currentQuestion.correctAnswer === answerGiven;

        makesound(wasCorrect);
        buttonAnimation(answerGiven);

        if (wasCorrect) {
            // showImage("../image/fishLogo.png");
            this.setState(states.Shield);
            this.results[this.currentQuestionIndex] = true;
        } else {
            this.setState(states.Caught);
            // showImage("../image/kaptajnKrog.png");
        }

        setTimeout(function () {
            // hideGameImage();
            gameState.setNextQuestion();
            console.log('callback')
        }, 3000);
    }
}

const numberOfButtons = document.querySelectorAll(".gameButton").length;

for (var i = 0; i < numberOfButtons; i++) {

    document.querySelectorAll(".gameButton")[i].addEventListener("click", function () {

        // The button have either A or B as inner html
        let clickedKey = this.innerHTML.toLowerCase();
        gameState.checkAnswer(clickedKey);
    });
}

function makesound(wasCorrect) {

    if (wasCorrect) {
        let audio = new Audio("sounds/correctSound.mp3")
        audio.play();
    } else {
        let audio = new Audio("sounds/incorrectSound.mp3")
        audio.play();
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);

    if (activeButton) {
        activeButton.classList.add("pressed");

        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}

//js for music button for game

const audio = document.getElementById("myAudio");

let isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}


function startGame() {
    gameState.setState(states.Question);
}

/* function that makes it possible to downloade the pdf file, when the chest image is clicked*/
document.getElementById('downloadImage').addEventListener('click', function () {
    const downloadLink = document.createElement('a');
    downloadLink.href = '../image/certifikatDataSikkerhed.pdf';
    downloadLink.download = 'certifikatDataSikkerhed.pdf';
    document.body.appendChild(downloadLink);
    // Klik på linket for at starte download
    downloadLink.click();
    // Fjern linket fra dokumentet
    document.body.removeChild(downloadLink);
});