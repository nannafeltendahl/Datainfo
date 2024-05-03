// ------------------------ Event Registration --------------------
// noinspection HttpUrlsUsage

// on page load
document.addEventListener('DOMContentLoaded', function () {
    gameState.resetGame();
});

//detecting keyboard press
document.addEventListener("keydown", function (event) {
    if (gameState && gameState.state === states.Question) {
        switch (event.key) {
            case 'a':
                const buttonElementA = document.getElementById("questionPageButtonA");
                gameState.checkAnswer(buttonElementA, event.key);
                break;
            case 'b':
                const buttonElementB = document.getElementById("questionPageButtonB")
                gameState.checkAnswer(buttonElementB, event.key);
                break;
        }
    }
});

const backgroundAudioElement = document.getElementById("myAudio");
const scoreElement = document.getElementById("score")
const scoreNumberElement = document.getElementById("scoreNumber")
const audioButtonElement = document.getElementById("audioButton");
const gamePageElements = document.querySelectorAll(".gamePage")

const buttonDelay = 200;
const buttonAnimationDelay = 100;
const checkAnswerDelay = 500;
const nextQuestionDelay = 1600;

const states = {
    Start: "Start",
    Question: "Question",
    Caught: "Caught",
    Shield: "Shield",
    ShieldGold: "ShieldGold",
    GameOver: "GameOver",
    DefaultState: "Start",
}

const questions =
    [
        {
            questionText: "Hvilken URL tror du er troværdig?",
            answerA: "A: https://www.borger.dk",
            answerB: "B: http://www.borger.dk",
            correctAnswer: "a",
            explanation: " Konsekvensen ved et URL http: uden s (secure) kan forårsage at din data i form af personlige oplysninger ikke bliver beskyttet, og kan blive misbrugt.",
        },
        {
            questionText: "Hvad er en sikker måde at identificere en legitim hjemmeside, når du indtaster følsomme oplysninger?",
            answerA: "A: Tilgå en hjemmeside gennem et link eller en sponsorede annonce",
            answerB: "B: Kontrollér, om webadressen starter med https: og viser et hængelås ikon i adressefeltet.",
            correctAnswer: "b",
            explanation: " Konsekvensen ved at klikke på en annonce eller et link, kan bl.a. være software med skadeligt indhold og virusser.",
        },
        {
            questionText: "Hvad er en sikker måde at opbevare dine adgangskoder på?",
            answerA: "A: Gemme dem i en tekstfil på din computer.",
            answerB: "B: Brug af en adgangskode generator til at opbevare og generere adgangskoder.",
            correctAnswer: "b",
            explanation: " Konsekvensen ved adgangskoder i en tekstfil på PCen, kan være manglende kryptering og nem tilgængelighed, i tilfælde af hacking.",
        },
        {
            questionText: "Spørgsmål: Hvad er formålet med smishing?",
            answerA: "A: At narre folk via SMS-beskeder.",
            answerB: "B: At narre folk via e-mails.",
            correctAnswer: "a",
            explanation: " Konsekvensen ved smishing (SMS) angreb kan være identitetstyveri og hacking af eks. billeder og adgangskoder",
        },
        {
            questionText: "Spørgsmål: Hvad er en typisk metode, som spoofing begrebet er kendt for at narre folk med?",
            answerA: "A:  At forfalske afsender adressen for at ligne en ægte.",
            answerB: "B: At vise en ægte afsenderadresse i e-mailen.",
            correctAnswer: "a",
            explanation: "Konsekvensen ved en forfalsket afsender adresse kan lede til mistillid" +
                " og kan have negative personlig, økonomiske og sikkerhedsmæssige påvirkninger.",
        },

        {
            questionText: "Du modtager en besked fra et nært familiemedlem, der spørger om at overføre penge via tilsendt nummer.",
            answerA: "A:  Man kan stole på beskeden når både nummer og navn stemmer oven ens",
            answerB: "B: Man kontakter familiemedlemmet på anden vis, og overføre ingen penge",
            correctAnswer: "b",
            explanation: "Det er muligt at forfalske både navn og nummer overfor modtagerne, " +
                " hvilket kan føre til mistillid og kan have negative personlig, økonomiske og sikkerhedsmæssige påvirkninger.  ",
        },
        {
            questionText: "Du modtager en mail med et link, linket ser helt troværdigt ud, uden stavefejl eller mærkelige tegn.",
            answerA: "A: Du taster selv URLen ind i browseren, uden at klikke på linket",
            answerB: "B: Du kan stole på et link, hvis det ser helt troværdigt ud ",
            correctAnswer: "a",
            explanation: "Det er muligt at ændre et link så det fremstår helt troværdigt, " +
                " hvilket kan forårsage at din data, i form af personlige oplysninger, ikke bliver beskyttet og kan blive misbrugt. ",
        },
        {
            questionText: "Du modtager en notifikation om at din bank app skal opdateres",
            answerA: "A:  Du undlader at opdatere, da opdateringen kan indeholde skadelige virusser",
            answerB: "B:  Du opdatere appen, som indeholder de nyeste og sikreste opdateringer",
            correctAnswer: "b",
            explanation: "Opdateringer indeholder den nyeste og sikreste opdateringer. " +
                "Konsekvensen ved ikke at opdatere, kan være forældelse af datasikring " +
                " og dermed gøre det lettere for de kriminelle at hacke dig. ",
        },
        {
            questionText: "Du modtager post i din e-boks, du logger ind og i brevet står om du vil deltage i en undersøgelse, deltagelse via link",
            answerA: "A:  Du klikker på linket, e-boks er helt sikkert og krypteret",
            answerB: "B:  Du er påpasselig med links fra ukendte kilder, selv på e-boks",
            correctAnswer: "b",
            explanation: "E-boks er en krypteret kommunikations enhed, men vær altid påpasselig overfor links fra ukendte kilder," +
                " Links kan indeholde skadeligt software og kan forårsage hacking af personlig data, ",
        },
        {
            questionText: "Hvilken adgangskode er stærkest af disse to?",
            answerA: "A:  Kolde#Luse#Arbejder#Under#Sol#01",
            answerB: "B:  Peter#1995#Arbejder#Under#Sol#01",
            correctAnswer: "a",
            explanation: "Brug aldrig personlig data i en adgangskode, konsekvensen kan være hacking af adgangskoden, " +
                " som tilmed afgiver yderligere personlige oplysninger.",
        },

    ]

// ---------------------- Game State -----------------------
let gameState = {
    results: null,
    currentQuestionIndex: 0,
    currentQuestion: null,
    state: states.Start,
    score: 0,

    setState: function (state) {
        this.state = state;
        this.updateVisibleElements();
    },
    resetGame: function () {
        this.setGameQuestion(0);
        this.score = 0;
        this.results = Array(questions.length).fill(false)
        this.setState(states.DefaultState);
    },
    updateVisibleElements: function () {

        scoreNumberElement.innerHTML = `Sikkerhedsskjold: ${this.score}/${questions.length}`;

        if (this.state === states.Start) {
            scoreElement.style.display = 'none';
            scoreNumberElement.style.display = 'none';
            audioButtonElement.style.display = 'none';
        } else {
            scoreElement.style.display = 'grid';
            scoreNumberElement.style.display = 'block';
            audioButtonElement.style.display = 'flex';
        }

        // start by hiding all
        gamePageElements.forEach(gamePageElement => gamePageElement.style.display = 'none');

        // display only one game page depending on state
        switch (this.state) {
            case states.Question:
                document.getElementById("questionPage").style.display = 'grid';
                break;
            case states.Caught:
                document.getElementById("caughtPage").style.display = 'grid';
                break;
            case states.Shield:
                document.getElementById("shieldPage").style.display = 'grid';
                break;
            case states.ShieldGold:
                document.getElementById("shieldGoldPage").style.display = 'grid';
                break;
            case states.GameOver:
                document.getElementById("gameOverPage").style.display = 'grid';
                break;

            case states.Start:
            default:
                document.getElementById("startPage").style.display = 'grid';
                break;

        }
    },
    setGameQuestion: function (questionIndex) {
        // set question with given index
        this.currentQuestionIndex = questionIndex; //
        this.currentQuestion = questions[this.currentQuestionIndex]

        document.getElementById("gameQuestion").innerHTML = this.currentQuestion.questionText;
        document.getElementById("gameQuestionOptionA").innerHTML = this.currentQuestion.answerA;
        document.getElementById("gameQuestionOptionB").innerHTML = this.currentQuestion.answerB;
    },
    setNextQuestion: function () {
        if (this.currentQuestionIndex + 1 >= questions.length) {

            log("The final score was: " + this.score);
            if (this.score === this.results.length) {

                this.setState(states.ShieldGold);
            } else {

                this.setState(states.GameOver);
            }
        } else {
            this.setGameQuestion(this.currentQuestionIndex + 1);
            this.setState(states.Question);
        }
    },
    checkAnswer: function (button, answerGiven) {
        let wasCorrect = this.currentQuestion.correctAnswer === answerGiven;

        buttonAnimation(button);

        if (wasCorrect) {
            gameState.score += 1;
            setTimeout(function () {
                makeSound(true);
                gameState.setState(states.Shield);
                gameState.results[gameState.currentQuestionIndex] = true;

                setTimeout(function () {
                    gameState.setNextQuestion();
                }, nextQuestionDelay);

            }, checkAnswerDelay);
        } else {
            setTimeout(function () {
                makeSound(false);
                gameState.setState(states.Caught);
                document.getElementById("caughtExplanation").innerHTML = `<p>${gameState.currentQuestion.explanation}</p>`;
            }, checkAnswerDelay);
        }
    }
}

function goToNextQuestion(button) {
    buttonAnimation(button);
    setTimeout(function () {
        gameState.setNextQuestion();
    }, buttonDelay);
}

document.getElementById("questionPageButtonA").addEventListener("click", function () {
    gameState.checkAnswer(this, 'a');
})
document.getElementById("questionPageButtonB").addEventListener("click", function () {
    gameState.checkAnswer(this, 'b');
})

//makes a sound for correct and incorrect answer
function makeSound(wasCorrect) {

    if (wasCorrect) {
        let audio = new Audio("sounds/correctSound.mp3")
        audio.play().then();
    } else {
        let audio = new Audio("sounds/arrr.mp3")
        audio.play().then();
    }
}

function buttonAnimation(button) {

    if (button) {
        button.classList.add("pressed");

        setTimeout(function () {
            button.classList.remove("pressed");
        }, buttonAnimationDelay);
    }
}

let isPlaying = false;

//js for music button for game
function toggleAudio() {

    let audioButtonOnElement = document.getElementById("audioButtonOn");
    let audioButtonOffElement = document.getElementById("audioButtonOff");

    if (isPlaying) {
        backgroundAudioElement.pause();
        audioButtonOnElement.style.display = 'none';
        audioButtonOffElement.style.display = 'flex';
    } else {
        backgroundAudioElement.play();
        audioButtonOnElement.style.display = 'flex';
        audioButtonOffElement.style.display = 'none';
    }
    isPlaying = !isPlaying;
}

function onToggleAudioButtonClick(button) {
    buttonAnimation(button);
    toggleAudio();
}

function startGame(button) {
    buttonAnimation(button);
    setTimeout(function () {
        gameState.setState(states.Question);
    }, buttonDelay);
    toggleAudio();
}
