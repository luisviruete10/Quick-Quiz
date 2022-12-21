const quizData = [
    {
        question: "What element to use to link JavaScript to HTML?",
        a: "<link>",
        b: "<href>",
        c: "<script>",
        d: "<title>",
        correct: "c",
    },
    {
        question: "Javascript is a ___-side progamming language?",
        a: "Both",
        b: "Server",
        c: "Client",
        d: "None",
        correct: "a",
    },
    {
        question: "How does a FOR loop start?",
        a: "for (I <= 5; i++)",
        b: "for in= 1 ton5",
        c: "for (i = 0; i <= 5)",
        d: "for (i=0; i<=5; i++)",
        correct: "d",
    },
    {
        question: "What operator is used to assign a value to a variable?",
        a: "x",
        b: "=",
        c: "8",
        d: "-",
        correct: "b",
    },
    {
        question: "How can you add a comment in JavaScript?",
        a: "<!--This is a comment-->",
        b: "//This is a comment",
        c: "'This is a comment'",
        d: "*This is a comment*",
        correct: "b",
    },
];
const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit")



let currentQuiz = 0
let score = 0


loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = flase)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener("click", () => {
    const answer = getSelected()
    if(answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++

        if(currentQuiz < quizData.length) {
           loadQuiz() 
        }else {
            quiz.innerHtml = '<h2> You answered ${score}/${quizData.length} questions correctly</h2>
            
            <button onclick
            '
        }
    }
})