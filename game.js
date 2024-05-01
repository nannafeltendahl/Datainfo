// ------------------------ Event Registration --------------------

// on page load
document.addEventListener('DOMContentLoaded', function () {
    log("Page loaded")
    gameState.resetGame();
});

//detecting keyboard press
document.addEventListener("keydown", function (event) {
    if (gameState && gameState.state === "Question") {
        switch (event.key) {
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

const questions =
    [
        {
            questionText: "Hvilken URL tror du er troværdig?",
            answerA: "A: https://www.borger.dk",
            answerB: "B: http://www.borger.dk",
            correctAnswer: "a",
            explanation: " Konsekvensen ved et URL uden s (secure) kan forårsage at din data i form af personlige oplysninger ikke bliver beskyttet, og kan blive misbrugt.",
        },
        {
            questionText: "Hvad er en sikker måde at identificere en legitim hjemmeside, når du indtaster følsomme oplysninger?",
            answerA: "A: Tilgå en hjemmeside gennem et link eller en sponsorede annonce",
            answerB: "B: Kontrollér, om webadressen starter med https: og viser en hængelåsikon i adressefeltet.",
            correctAnswer: "b",
            explanation: " Konsekvensen ved at klikke på en annonce eller et link, kan bl.a. være skadeligt software og virusinfektioner.",
        },
        {
            questionText: "Hvad er en sikker måde at opbevare dine adgangskoder på?",
            answerA: "A: Gemme dem i en tekstfil på din computer.",
            answerB: "B: Brug af en adgangskodeadministrator til at opbevare og generere adgangskoder.",
            correctAnswer: "b",
            explanation: " Konsekvensen ved adgangskoder på PCen, kan være manglende kryptering og nem synlighed, i tilfælde af hacking.",
        },
        {
            questionText: "Spørgsmål: Hvad er formålet med smishing?",
            answerA: "A: At narre folk via SMS-beskeder.",
            answerB: "B: At narre folk via e-mails.",
            correctAnswer: "a",
            explanation: " Konsekvensen ved smishing (sms) angreb kan bla, være identitetstyveri og hacking af eks. billeder mm.",
        },
        {
            questionText: "Spørgsmål: Hvad er en typisk metode, som spoofing bruger til at narre folk?",
            answerA: "A:  At forfalske afsenderadressen for at ligne en ægte afsender.",
            answerB: "B: At vise en ægte afsenderadresse i e-mailen.",
            correctAnswer: "a",
            explanation: "Konsekvensen ved en forfalsket afsenderadresse kan lede til mistillid" +
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
            answerA: "A:  Tast selv URLen ind i browseren, uden at klikke på linket",
            answerB: "B: Du kan stole på link, hvis det ser helt troværdigt ud ",
            correctAnswer: "a",
            explanation: "Det er muligt at ændre et link så det fremstår helt troværdigt, " +
                " hvilket kan forårsage at din data i form af personlige oplysninger ikke bliver beskyttet, og kan blive misbrugt. ",
        },
        {
            questionText: "Du modtager en notifikation om at din bank app skal opdateres",
            answerA: "A:  Du undlader at opdatere, da opdatering kan indeholde skadelige virusser",
            answerB: "B:  Du opdatere appen, som indeholder de nyeste og sikreste opdateringer",
            correctAnswer: "b",
            explanation: "Opdateringer indeholder den nyeste og sikreste opdatering. " +
                "Konsekvensen ved ikke at opdatere, kan være forældelse af datasikring " +
                " og dermed gøre det lettere for de kriminelle at hacke dig. ",
        },
        {
            questionText: "Du modtager post i din e-boks, du logger ind og i brevet står om du vil deltage i en undersøgelse, deltage via link",
            answerA: "A:  Du klikker på linket, e-boks er helt sikkert og krypteret",
            answerB: "B:  Du er påpasselig med links fra ukendte kilder, selv på e-boks",
            correctAnswer: "b",
            explanation: "E-boks er en krypteret kommunikationsform, men vær altid påpasselig overfor links fra ukendte kilder," +
                " Links kan indeholde skadeligt software og kan forårsage hacking af personlig data, ",
        },
        {
            questionText: "Hvilken adgangskode er stærkest?",
            answerA: "A:  Jeg#ElskerAtLøbeITræskoven!",
            answerB: "B:  Lars#1990#3689!",
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
        this.updateGamePagesShown();
    },
    resetGame: function () {
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
                // TODO: you got this many out of x correct, try again / restart game
                this.setState(states.GameOver);
            }
        } else {
            this.setGameQuestion(this.currentQuestionIndex + 1);
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
            document.getElementById("caughtExplanation").innerHTML = `<p>${this.currentQuestion.explanation}</p>`;
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

//makes a sound for correct and incorrect answer
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