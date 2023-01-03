// LET FOR TIMER
let time = document.querySelector(".timer");
let score = document.querySelector("#score");
let secondsLeft = 75;

//CONST FOR BUTTONS
const start = document.querySelector("#start");

// LET FOR STARTING CHALLENGE
const codersIntro = document.querySelector("#challenge-begins");

// LOADS THE QUESTIONS
var questionsEl = document.querySelector(".all-question");

let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// FINAL SCORE
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// HIGHSCORE 
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// ANSWER BUTTON 
const ansBtn = document.querySelectorAll("button.answer-btn")

//  BUTTON FOR INTIALS, GO, CLEAR, VIEW
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// CONST FOR ANSWER
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// ARRAY OF QUESTION 
const questions = [
    {
        question: "What element to use to link JavaScript to HTML?",
        answers: ["0. <link>", "1. <href>", "2. <script>", "3. <title>"],
        correctAnswer: "2"
    },
    {
        question: "Javascript is a ___-side progamming language?",
        answers: ["0. Both","1. Server","2. Client", "3. None"],
        correctAnswer: "0",
    },
    {
        question: "How does a FOR loop start?",
        answers: ["0. for (I <= 5; i++)", "1. for in= 1 ton5", "2. for (i = 0; i <= 5)", "3. for (i=0; i<=5; i++)"],
        correctAnswer: "3",
    },
    {
        question: "What operator is used to assign a value to a variable?",
        answers: ["0. x", "1. =", "2. 8", "3. -"],
        correctAnswer: "1",
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: ["0. <!--This is a comment-->", "1. /This is a comment", "2. 'This is a comment'" ,"3. *This is a comment*"],
        correctAnswer: "1",
    }
];

// TIMER FUNCTION  
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// QUIZ BEGIN FUNCTION
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// SET QUESTION FUNCTION
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// EVENT FUNCTION 
function checkAnswer(event) {
    event.preventDefault();

    
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // HIGH SCORE LIST
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // SCORE STORAGE 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// CLEAR THE STORE
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// STARTING EVENT 

start.addEventListener("click", startQuiz);


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


submitScrBtn.addEventListener("click", addScore);

 
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// CLEAR SCORE
clearScrBtn.addEventListener("click", clearScores);

// HIGH SCORE BUTTON AND DISPLAY 
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Hey. Take Quiz. There is No High Score.");
    }
});