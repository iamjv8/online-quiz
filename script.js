import quizData from "./quizData.js";
// Application State
let gameState = {
  currentScreen: "welcome",
  playerName: "",
  selectedCategory: null,
  currentQuestionIndex: 0,
  answers: [],
  timer: null,
  timeLeft: 10,
  showingAnswer: false,
};

// DOM Elements
const screens = {
  welcome: document.getElementById("welcome-screen"),
  quiz: document.getElementById("quiz-screen"),
  results: document.getElementById("results-screen"),
};

const elements = {
  playerNameInput: document.getElementById("playerName"),
  categoryGrid: document.getElementById("categoryGrid"),
  startQuizBtn: document.getElementById("startQuizBtn"),
  playerNameDisplay: document.getElementById("playerNameDisplay"),
  exitQuizBtn: document.getElementById("exitQuizBtn"),
  questionCounter: document.getElementById("questionCounter"),
  timer: document.getElementById("timer"),
  progressFill: document.getElementById("progressFill"),
  questionText: document.getElementById("questionText"),
  optionsGrid: document.getElementById("optionsGrid"),
  nextBtn: document.getElementById("nextBtn"),
  skipBtn: document.getElementById("skipBtn"),
  finalScore: document.getElementById("finalScore"),
  performanceMessage: document.getElementById("performanceMessage"),
  totalQuestionsText: document.getElementById("totalQuestionsText"),
  correctCount: document.getElementById("correctCount"),
  incorrectCount: document.getElementById("incorrectCount"),
  unansweredCount: document.getElementById("unansweredCount"),
  retakeQuizBtn: document.getElementById("retakeQuizBtn"),
};

// Initialize Application
function initializeApp() {
  renderCategories();
  setupEventListeners();
  showScreen("welcome");
}

// Screen Management
function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
  gameState.currentScreen = screenName;
}

// Event Listeners
function setupEventListeners() {
  // Welcome screen
  elements.playerNameInput.addEventListener("input", validateWelcomeForm);
  elements.startQuizBtn.addEventListener("click", startQuiz);

  // Quiz screen
  elements.exitQuizBtn.addEventListener("click", exitQuiz);
  elements.nextBtn.addEventListener("click", nextQuestion);
  elements.skipBtn.addEventListener("click", skipQuestion);

  // Results screen
  elements.retakeQuizBtn.addEventListener("click", retakeQuiz);
}

// Welcome Screen Functions
function renderCategories() {
  elements.categoryGrid.innerHTML = "";

  quizData.categories.forEach((category) => {
    const categoryElement = createCategoryElement(category);
    elements.categoryGrid.appendChild(categoryElement);
  });
}

function createCategoryElement(category) {
  const div = document.createElement("div");
  div.className = "category-option";
  div.dataset.categoryId = category.id;

  div.innerHTML = `
        <div class="radio-button">
            <div class="radio-dot"></div>
        </div>
        <span class="category-name">${category.name}</span>
    `;

  div.addEventListener("click", () => selectCategory(category.id));

  return div;
}

function selectCategory(categoryId) {
  // Remove previous selection
  document.querySelectorAll(".category-option").forEach((el) => {
    el.classList.remove("selected");
  });

  // Add selection to clicked category
  const selectedElement = document.querySelector(
    `[data-category-id="${categoryId}"]`
  );
  selectedElement.classList.add("selected");

  gameState.selectedCategory = quizData.categories.find(
    (cat) => cat.id === categoryId
  );
  validateWelcomeForm();
}

function validateWelcomeForm() {
  const hasName = elements.playerNameInput.value.trim().length > 0;
  const hasCategory = gameState.selectedCategory !== null;

  elements.startQuizBtn.disabled = !(hasName && hasCategory);
}

function startQuiz() {
  gameState.playerName = elements.playerNameInput.value.trim();
  gameState.currentQuestionIndex = 0;
  gameState.answers = [];

  elements.playerNameDisplay.textContent = gameState.playerName;

  showScreen("quiz");
  loadQuestion();
}

// Quiz Screen Functions
function loadQuestion() {
  if (!gameState.selectedCategory) return;

  const question =
    gameState.selectedCategory.questions[gameState.currentQuestionIndex];
  const questionNumber = gameState.currentQuestionIndex + 1;
  const totalQuestions = gameState.selectedCategory.questions.length;

  // Update UI
  elements.questionCounter.textContent = `${questionNumber} /${totalQuestions}`;
  elements.questionText.textContent = `${questionNumber}. ${question.question}`;

  // Update progress bar
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  elements.progressFill.style.width = `${progressPercentage}%`;

  // Render options
  renderOptions(question.options);

  // Reset timer and start countdown
  gameState.timeLeft = question.timeLimit;
  gameState.showingAnswer = false;
  elements.nextBtn.disabled = true;
  updateTimerDisplay();
  startTimer();
}

function renderOptions(options) {
  elements.optionsGrid.innerHTML = "";

  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = option;
    button.dataset.option = option;

    button.addEventListener("click", () => selectOption(option));

    elements.optionsGrid.appendChild(button);
  });
}

function selectOption(selectedOption) {
  if (gameState.showingAnswer) return;

  // Remove previous selections
  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Add selection to clicked option
  const selectedButton = document.querySelector(
    `[data-option="${selectedOption}"]`
  );
  selectedButton.classList.add("selected");

  // Enable next button
  elements.nextBtn.disabled = false;

  gameState.selectedAnswer = selectedOption;
}

function startTimer() {
  clearInterval(gameState.timer);

  gameState.timer = setInterval(() => {
    gameState.timeLeft--;
    updateTimerDisplay();

    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer);
      timeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;
  elements.timer.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Add warning class when time is low
  if (gameState.timeLeft <= 3) {
    elements.timer.classList.add("warning");
  } else {
    elements.timer.classList.remove("warning");
  }
}

function timeUp() {
  submitAnswer(null);
}

function nextQuestion() {
  if (gameState.selectedAnswer) {
    showCorrectAnswer(() => {
      submitAnswer(gameState.selectedAnswer);
    });
  }
}

function skipQuestion() {
  submitAnswer(null);
}

function showCorrectAnswer(callback) {
  gameState.showingAnswer = true;
  clearInterval(gameState.timer);

  const currentQuestion =
    gameState.selectedCategory.questions[gameState.currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.disabled = true;

    if (btn.dataset.option === correctAnswer) {
      btn.classList.add("correct");
    } else if (
      btn.classList.contains("selected") &&
      btn.dataset.option !== correctAnswer
    ) {
      btn.classList.add("incorrect");
    }
  });

  elements.nextBtn.disabled = true;
  elements.skipBtn.disabled = true;

  setTimeout(callback, 1000);
}

function submitAnswer(answer) {
  const currentQuestion =
    gameState.selectedCategory.questions[gameState.currentQuestionIndex];
  const isCorrect = answer === currentQuestion.correctAnswer;

  const answerData = {
    questionId: currentQuestion.id,
    selectedAnswer: answer,
    correctAnswer: currentQuestion.correctAnswer,
    isCorrect: isCorrect,
  };

  gameState.answers.push(answerData);
  gameState.selectedAnswer = null;

  // Move to next question or show results
  if (
    gameState.currentQuestionIndex <
    gameState.selectedCategory.questions.length - 1
  ) {
    gameState.currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function exitQuiz() {
  clearInterval(gameState.timer);
  resetGame();
  showScreen("welcome");
}

// Results Screen Functions
function showResults() {
  clearInterval(gameState.timer);

  const results = calculateResults();

  // Update score display
  elements.finalScore.textContent = `${results.score}%`;
  elements.finalScore.className = `final-score ${getScoreClass(results.score)}`;

  // Update performance message
  elements.performanceMessage.textContent = getPerformanceMessage(
    results.score
  );

  // Update stats
  elements.totalQuestionsText.textContent = `Out of ${results.totalQuestions} questions`;
  elements.correctCount.textContent = results.correctAnswers;
  elements.incorrectCount.textContent = results.incorrectAnswers;
  elements.unansweredCount.textContent = results.unansweredQuestions;

  showScreen("results");
}

function calculateResults() {
  const correctAnswers = gameState.answers.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = gameState.answers.filter(
    (answer) => answer.selectedAnswer !== null && !answer.isCorrect
  ).length;
  const unansweredQuestions = gameState.answers.filter(
    (answer) => answer.selectedAnswer === null
  ).length;
  const totalQuestions = gameState.selectedCategory.questions.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    totalQuestions,
    score,
  };
}

function getScoreClass(score) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "poor";
}

function getPerformanceMessage(score) {
  if (score >= 80) return "Great job!";
  if (score >= 60) return "Good work!";
  if (score >= 40) return "Keep practicing!";
  return "Keep studying!";
}

function retakeQuiz() {
  resetGame();
  showScreen("welcome");
}

// Utility Functions
function resetGame() {
  clearInterval(gameState.timer);

  gameState = {
    currentScreen: "welcome",
    playerName: "",
    selectedCategory: null,
    currentQuestionIndex: 0,
    answers: [],
    timer: null,
    timeLeft: 10,
    showingAnswer: false,
  };

  // Reset form
  elements.playerNameInput.value = "";
  elements.startQuizBtn.disabled = true;

  // Remove category selections
  document.querySelectorAll(".category-option").forEach((el) => {
    el.classList.remove("selected");
  });
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
