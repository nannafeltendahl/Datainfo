// ------------------------ Event Registration --------------------

// on page load
document.addEventListener('DOMContentLoaded', function () {
    log("Page loaded")
    gameState.resetGame();
});

//detecting keyboard press
document.addEventListener("keydown", function (event) {
    if(gameState && gameState.state === "Question")
    {
        switch (event.key){
            case 'a':
            case 'b':
                gameState.checkAnswer(event.key);
                break;
        }
    }
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
            explanation: "Der mangler et s i https...",
        },
        {
            questionText: "Hvad er en sikker måde at identificere en legitim hjemmeside, når du indtaster følsomme oplysninger?",
            answerA: "A: Tilgå en hjemmeside gennem et link eller en sponsorede annonce",
            answerB: "B: Kontrollér, om webadressen starter med https: og viser en hængelåsikon i adressefeltet.",
            correctAnswer: "b",
            explanation: "2",
        },
        {
            questionText: "Hvad er en sikker måde at opbevare dine adgangskoder på?",
            answerA: "A: Gemme dem i en tekstfil på din computers skrivebord.",
            answerB: "B: Brug af en adgangskodeadministrator til at opbevare og generere sikre adgangskoder.",
            correctAnswer: "b",
            explanation: "3",
        },
        {
            questionText: "Spørgsmål: Hvad er formålet med smishing?",
            answerA: "A: At narre folk via SMS-beskeder.",
            answerB: "B: At narre folk via e-mails.",
            correctAnswer: "a",
            explanation: "4",
        },
        {
            questionText: "Spørgsmål: Hvad er en typisk metode, som spoofing bruger til at narre folk?",
            answerA: "A:  At forfalske afsenderadressen for at ligne en ægte afsender.",
            answerB: "B: At vise en ægte afsenderadresse i e-mailen.",
            correctAnswer: "a",
            explanation: "...",
        },

        {
            questionText: "Du modtager en besked fra et nært familiemedlem, der spørger om at overføre penge via tilsendt nummer.",
            answerA: "A:  Man kan stole på beskeden når både nummer og navn stemmer oven ens",
            answerB: "B: Man kontakter familiemedlemmet på anden vis, og overføre ingen penge",
            correctAnswer: "b",
            explanation: "...",
        },
        {
            questionText: "Du modtager en mail med et link, linket ser helt troværdigt ud, uden stavefejl eller mærkelige tegn.",
            answerA: "A:  Tast selv URLen ind i browseren, uden at klikke på linket",
            answerB: "B: Du kan stole på link, hvis det ser helt troværdigt ud ",
            correctAnswer: "a",
            explanation: "...",
        },
        {
            questionText: "Du modtager en notifikation om at din bank app skal opdateres",
            answerA: "A:  Du undlader at opdatere, da opdatering kan indeholde skadelige virusser",
            answerB: "B:  Du opdatere appen, som indeholder de nyeste og sikreste opdateringer",
            correctAnswer: "b",
            explanation: "...",
        },
        {
            questionText: "Du modtager post i din e-boks, du logger ind og i brevet står om du vil deltage i en undersøgelse, deltage via link",
            answerA: "A:  Du klikker på linket, e-boks er helt sikkert og krypteret",
            answerB: "B:  Du er påpasselig med links fra ukendte kilder, selv på e-boks",
            correctAnswer: "b",
            explanation: "...",
        },
        {
            questionText: "Hvilken adgangskode er stærkest?",
            answerA: "A:  Jeg#ElskerAtLøbeITræskoven!",
            answerB: "B:  Lars#1990#3689!",
            correctAnswer: "a",
            explanation: "...",
        },

    ]

// ---------------------- Game State -----------------------
let gameState = { // dette er en variable med navnet gameState, som indeholder nogle forskellige variable med en værdi og nogle funktioner
    results: null,
    currentQuestionIndex: 0, //variable with a value
    currentQuestion: null, //variable with a value of null
    state: states.Start,
    score: 0,

    setState: function (state) {
        this.state = state;
        this.updateGamePagesShown();
    },
    resetGame: function () { //this is a function called resetGame, that takes og calls for the variables from gameState through a this.
        this.setGameQuestion(0);
        this.score = 0;
        this.results = Array(questions.length).fill(false)
        this.setState(states.Start);
    },
    updateGamePagesShown: function () {
        // Update score
        let scoreElement = document.getElementById("score")
        let scoreNumberElement = document.getElementById("scoreNumber")
        scoreElement.style.display = 'grid';
        scoreNumberElement.innerHTML = `Sikkerhedsskjold: ${this.score}/${questions.length}`;

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
                this.score += 1;
                break;
            case "ShieldGold":
                document.getElementById("shieldGoldPage").style.display = 'grid';
                break;
            case "GameOver":
                document.getElementById("gameOverPage").style.display = 'grid';
                break;

            default:
                document.getElementById("startPage").style.display = 'grid';
                scoreElement.style.display = 'none';
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
            log("The final score was: " + this.score);
            if (this.score === this.results.length) {
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
            this.setState(states.Shield);
            this.results[this.currentQuestionIndex] = true;

            setTimeout(function () {
                gameState.setNextQuestion();
            }, 2000);
        } else {
            this.setState(states.Caught);
            document.getElementById("caughtExplanation").innerHTML = `Forklaring: <p>${this.currentQuestion.explanation}</p>`;
        }


    }
}

function goToNextQuestion() {
    gameState.setNextQuestion()
}

document.getElementById("questionPageButtonA").addEventListener("click", function () {
    gameState.checkAnswer('a');
})
document.getElementById("questionPageButtonB").addEventListener("click", function () {
    gameState.checkAnswer('b');
})

function makesound(wasCorrect) {

    if (wasCorrect) {
        let audio = new Audio("sounds/correctSound.mp3")
        audio.play();
    } else {
        // let audio = new Audio("sounds/incorrectSound.mp3")
        let audio = new Audio("sounds/arrr.mp3")
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
    downloadLink.href = './image/certifikatDataSikkerhed.pdf';
    downloadLink.download = 'certifikatDataSikkerhed.pdf';
    document.body.appendChild(downloadLink);
    // Klik på linket for at starte download
    downloadLink.click();
    // Fjern linket fra dokumentet
    document.body.removeChild(downloadLink);
});