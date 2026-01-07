const quiz = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "None"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
    {
        question: "Which is not a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: 2
    }
];

// shuffle questions
quiz.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    document.getElementById("question").innerText =
        quiz[currentQuestion].question;

    const options = document.querySelectorAll(".option");
    options.forEach((btn, index) => {
        btn.innerText = quiz[currentQuestion].options[index];
        btn.disabled = false;
    });

    document.getElementById("progress").innerText =
        `Question ${currentQuestion + 1} of ${quiz.length}`;
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    if (selected === quiz[currentQuestion].answer) {
        score++;
    }

    document.querySelectorAll(".option")
        .forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestion++;

    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").innerHTML = `
            <h2>Quiz Finished 🎉</h2>
            <h3>Your Score: ${score} / ${quiz.length}</h3>
            <button onclick="location.reload()">Restart</button>
        `;
    }
}

// start quiz
loadQuestion();
