$(document).ready(function () {
    $(".toggle-nav").click(function () {
        $(".desktop-nav").slideToggle();

    });

});
$(document).ready(function () {
    $('#region').change(function () {
        var selectedValue = $(this).val();

        // Scroll to the selected section
        $('html, body').animate({
            scrollTop: $('#' + selectedValue).offset().top
        }, 1000);
    });
});

// ---------------------- Game State -----------------------
let gameState = { // dette er en variable med navnet gameState, som indeholder nogle forskellige variable med en værdi og nogle funktioner
    results: null,
    currentQuestionIndex: 0, //variable with a value
    currentQuestion: null, //variable with a value of null

    resetGame: function () { //this is a function called resetGame, that takes og calls for the variables from gameState through a this.
        this.setGameQuestion(0);
        this.results = Array(questions.length).fill(false)
    },
    setGameQuestion: function (questionIndex) { //dette er en function med navnet setGameQuestion, med variablen questionIndex
        // set question with given index
        this.currentQuestionIndex = questionIndex; //
        this.currentQuestion = questions[this.currentQuestionIndex] //current question is equal to questions with the input from questionIndex above

        let questionDivElement = document.getElementById("question"); // this is a let variable that is set on the id question from html.
        questionDivElement.innerHTML = ""
        questionDivElement.innerHTML += '<p>' + this.currentQuestion.questionText + '</p>'// it takes the text inside the inner html from a p tag,
        // and pluses with the text from the const question. to put the text from the const question inside the p tag. So that the inner html can change (new question)
        questionDivElement.innerHTML += '<p>' + this.currentQuestion.answerA + '</p>'
        questionDivElement.innerHTML += '<p>' + this.currentQuestion.answerB + '</p>'

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
                let questionDivElement = document.getElementById("question");
                questionDivElement.innerHTML = "YAAAY!<img src='image/goldFishLogo.png' />";
            } else {
                // TODO: you got this many out of x correct, try again / restart game
            }
        } else {
            this.setGameQuestion(this.currentQuestionIndex + 1); // if not the above is the case, then set the + 1 to the currentQuestionIndex
        }
    },
    checkAnswer: function (answerGiven) {
        let wasCorrect = this.currentQuestion.correctAnswer === answerGiven;

        makesound(wasCorrect);
        buttonAnimation(answerGiven);

        if (wasCorrect) {
            showImage("../image/fishLogo.png");
            this.results[this.currentQuestionIndex] = true;
        } else {
            showImage("../image/kaptajnKrog.png");
        }

        setTimeout(function () {
            hideGameImage();
            gameState.setNextQuestion();
            console.log('callback')
        }, 3000);
    }
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

// ------------------------------ logging ------------------------
function log(message) {
    if (console && console.log) {
        console.log(message)
    }
}

const numberOfButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfButtons; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        // The button have either A or B as inner html
        let clickedKey = this.innerHTML.toLowerCase();
        gameState.checkAnswer(clickedKey);
    });
}

function makesound(wasCorrect) {

    if (wasCorrect) {
        let audio = new Audio("sounds/correctSound")
        audio.play();
    } else {
        let audio = new Audio("sounds/incorrectSound")
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

const questionDiv = document.getElementById("question");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");

const imageContainer = document.getElementById("imageContainer");
const imageToShow = document.getElementById("imageToShow");


// Funktion for at vise billedet
function showImage(imageSrc) {
    // Skift display-stilen for at vise billedet
    imageContainer.style.display = "block";
    // Opdater billedets kilde
    imageToShow.src = imageSrc;
    // Skjul spørgsmålet
    questionDiv.style.display = "none";
}

function hideGameImage() {
    imageContainer.style.display = "none";
    questionDiv.style.display = "block";
}

const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc [i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });
}
