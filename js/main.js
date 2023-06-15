var questions = {
    "История": [
        {
            question: "В каком году произошла Октябрьская революция?",
            answers: ["1917", "1905", "1945", "1991"],
            correctAnswer: 0
        },{
            question: "Кто был первым президентом США?",
            answers: ["Джордж Вашингтон", "Томас Джефферсон", "Авраам Линкольн", "Барак Обама"],
            correctAnswer: 0
        },{
            question: "Когда было Крещение Руси?",
            answers: ["1831г.", "988г.", "132г.", "957г."],
            correctAnswer: 1
        },{
            question: "Когда была Бородинская битва?",
            answers: ["1816", "1815", "1812", "1773"],
            correctAnswer: 2
        },{
            question: "В каком году был основан Санкт-Петербург",
            answers: ["1702", "1701", "1704", "1703"],
            correctAnswer: 3
        },{
            question: "Когда началась Великая Отечественная Война?",
            answers: ["22 июля 1941г.", "22 июня 1941г.", "22 мая 1941г.", "22 августа 1941г."],
            correctAnswer: 0
        },
    ],
    "География": [
        {
            question: "Сколько континентов на планете Земля?",
            answers: ["6", "7", "4", "5"],
            correctAnswer: 1
        },
        {
            question: "Какая река самая большая в мире?",
            answers: ["Амазонка", "Ганг", "Енисей", "Дон"],
            correctAnswer: 0
        },
        {
            question: "Какие горы находятся на юге России?",
            answers: ["Кавказ", "Урал", "Гималаи", "Апалачи"],
            correctAnswer: 0
        },
        {
            question: "В каком регионе доывают золото?",
            answers: ["Якутия", "Камчатка", "Чукотка", "Сахалин"],
            correctAnswer: 0
        },
        {
            question: "Где живут белые медведи",
            answers: ["Антарктида", "Северный полюс", "Мурманск", "Дудинка"],
            correctAnswer: 0
        },
    ],
};

var currentCategory;
var currentQuestionIndex;
var score;

function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;

    hideCategorySelect();
    showQuiz();

    displayQuestion();
}

function showCategorySelect() {
    document.getElementById("category-select").style.display = "block";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "none";
}

function hideCategorySelect() {
    document.getElementById("category-select").style.display = "none";
}

function showQuiz() {
    document.getElementById("quiz-container").style.display = "block";
}

function displayQuestion() {
    var questionData = questions[currentCategory][currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    var answerButtons = document.getElementsByClassName("answer-btn");
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questionData.answers[i];
    }
}

function checkAnswer(answerIndex) {
    var questionData = questions[currentCategory][currentQuestionIndex];
    if (answerIndex === questionData.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    var resultText = "Вы ответили правильно на " + score + " вопросов из " + questions[currentCategory].length + ".";
    document.getElementById("result-text").textContent = resultText;

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
}

showCategorySelect();