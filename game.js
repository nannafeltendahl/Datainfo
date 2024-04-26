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
            questionText: "Hvilken URL tror du er falsk og hvilken er troværdig?",
            answerA: "A: https://www.borger.dk",
            answerB: "B: http://www_borger.dk",
            correctAnswer: "a",
        },
        {
            questionText: "b is correct",
            answerA: "",
            answerB: "",
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

        switch (this.state) {
            case "Question":
                document.getElementById("questionPage").style.display = 'block';
                break;
            case "Caught":
                document.getElementById("caughtPage").style.display = 'block';
                break;
            case "Shield":
                document.getElementById("shieldPage").style.display = 'block';
                break;
            case "ShieldGold":
                document.getElementById("shieldGoldPage").style.display = 'block';
                break;
            case "GameOver":
                document.getElementById("gameOverPage").style.display = 'block';
                break;

            default:
                document.getElementById("startPage").style.display = 'block';
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

// const questionDiv = document.getElementById("question");
// const btnA = document.getElementById("btnA");
// const btnB = document.getElementById("btnB");
//
// const imageContainer = document.getElementById("imageContainer");
// const imageToShow = document.getElementById("imageToShow");


// Funktion for at vise billedet
// function showImage(imageSrc) {
//     // Skift display-stilen for at vise billedet
//     imageContainer.style.display = "block";
//     // Opdater billedets kilde
//     imageToShow.src = imageSrc;
//     // Skjul spørgsmålet
//     questionDiv.style.display = "none";
// }
//
// function hideGameImage() {
//     imageContainer.style.display = "none";
//     questionDiv.style.display = "block";
// }

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