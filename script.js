// DOM Elements
const categorySelect = document.getElementById('category');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const totalQuestion = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');
const categorySection = document.getElementById('category-section');
const questionSection = document.getElementById('question-section');
const resultSection = document.getElementById('result-section');

// All Questions
let questionsArray = [
  {
    question: 'Which of the following is a void element?',
    options: ['p', 'div', 'img', 'section'],
    correctAnswer: 'img',
    category: 'HTML'
  },
  {
    question: 'What is the ul element used for in HTML?',
    options: ['It is used to group a list of images only.', 'It is used to group an ordered list of items.', 'It is used to group a bulleted list of items.', 'It is used to group a list of links only.'],
    correctAnswer: 'It is used to group an ordered list of items.',
    category: 'HTML'
  }, 
  {
    question: 'Which of the following is the correct way to apply multiple classes to an HTML element?',
    options: ['<div class="box red-box"></div>', '<div class="box-red-box"></div>', '<div class="box>>red>>box"></div>', '<div class="box<<red<<box"></div>'],
    correctAnswer: '<div class="box red-box"></div>',
    category: 'HTML'
  },
  {
    question: 'Which of the following is considered the most important heading on a web page?',
    options: ['h5', 'h6', 'h3', 'h1'],
    correctAnswer: 'h1',
    category: 'HTML'
  }, 
  {
    question: ' Which of the following elements is used to link to external resources like stylesheets and site icons?',
    options: ['a', 'link', 'div', 'p'],
    correctAnswer: 'a',
    category: 'HTML'
  },
  {
    question: 'Which of the following is a correct CSS rule?',
    options: ['p=red', 'p (color: red)', '{p color: red;}', 'p {color: red;}'],
    correctAnswer: 'p {color: red;}',
    category: 'CSS'
  },
  {
    question: 'What does CSS stand for?',
    options: ['Cascading Style Script', 'Cascading Style Sheets', 'Concatenating Style Script', 'CSS'],
    correctAnswer: 'Cascading Style Sheets',
    category: 'CSS'
  }, 
  {
    question: 'When using internal CSS, where is the style element placed within the HTML?',
    options: ['In the body element.', 'In the script element', 'In the footer element', 'In the head element'],
    correctAnswer: 'In the head element',
    category: 'CSS'
  },
  {
    question: 'Which selector correctly targets h1 elements only when inside a div?',
    options: ['div, h1 {}', 'div ~ h1 {}', 'div h1 {}', 'div + h1 {}'],
    correctAnswer: 'div h1 {}',
    category: 'CSS'
  }, 
  {
    question: 'Which selector is correct to target the next sibling of an img?',
    options: ['img ~ h1 {}', 'img > h1 {}', 'img + h1 {}', 'img h1 {}'],
    correctAnswer: 'img ~ h1 {}',
    category: 'CSS'
  },
  {
    question: 'Which of the following best describes JavaScript?',
    options: ['A programming language used for web development.', 'A server-side programming language.', 'A database management system.', 'A markup language used to design websites.'],
    correctAnswer: 'A programming language used for web development.',
    category: 'Javascript'
  },
  {
    question: 'Which of the following is NOT a JavaScript data type?',
    options: ['Number', 'Double', 'Object', 'Undefined'],
    correctAnswer: 'Double',
    category: 'Javascript'
  },
  {
    question: "What's the result of the expression undefined > 0?",
    options: ['false', 'null', 'true', 'undefined'],
    correctAnswer: 'false',
    category: 'Javascript'
  },
  {
    question: 'Which logical operation does || represent?',
    options: ['OR', 'NOT', 'AND', 'OR-FOR'],
    correctAnswer: 'OR',
    category: 'Javascript'
  },
  {
    question: "What's the output of the following code?...console.log(5 === 2 + 3 || 4 == 2);",
    options: ['true', 'false', 'An error is raised', 'Undefinded'],
    correctAnswer: 'true',
    category: 'Javascript'
  }
] 


let filteredQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

// Start Quiz
startBtn.addEventListener('click', () => {
  const selectedCategory = categorySelect.value.toLowerCase();
  filteredQuestions = questionsArray.filter(q => q.category.toLowerCase() === selectedCategory);

  if (filteredQuestions.length > 0) {
    categorySection.classList.add('hidden');
    questionSection.classList.remove('hidden');
    totalQuestion.textContent = filteredQuestions.length;
    currentIndex = 0;
    score = 0;
    showQuestion();
  }
});

// Show a question
function showQuestion() {
  const currentQuestion = filteredQuestions[currentIndex];
  questionText.textContent = currentQuestion.question;
  optionContainer.innerHTML = '';
  nextBtn.disabled = true;
  nextBtn.textContent = 'Submit Answer';
  selectedAnswer = null;

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    optionContainer.appendChild(button);
     updateProgressBar();
    button.addEventListener('click', () => {
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
      });
      button.classList.add('selected');
      selectedAnswer = option;
      nextBtn.disabled = false;
    });
  });
}

// Handle Submit & Next
nextBtn.addEventListener('click', () => {
  const currentQuestion = filteredQuestions[currentIndex];
  const allButtons = document.querySelectorAll('.option-btn');

  // First click: check and show result
  if (nextBtn.textContent === 'Submit Answer') {
    if (!selectedAnswer) return;

    // Disable all options
    allButtons.forEach(btn => btn.disabled = true);

    const selectedBtn = document.querySelector('.option-btn.selected');
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
    } else {
      selectedBtn.classList.add('wrong');
      allButtons.forEach(btn => {
        if (btn.textContent === currentQuestion.correctAnswer) {
          btn.classList.add('correct');
        }
      });
    }

    nextBtn.textContent = (currentIndex === filteredQuestions.length - 1) ? 'Finish Quiz' : 'Next Question';

  } else {
    // Second click: go to next question or finish
    currentIndex++;
    if (currentIndex < filteredQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
});

// Show Final Result
function showResult() {
  questionSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  finalScore.textContent = score;
  progressBar.style.width = '100%';
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  categorySection.classList.remove('hidden');
  categorySelect.value = '';
});

function updateProgressBar() {
  const percent = ((currentIndex) / filteredQuestions.length) * 100;
  progressBar.style.width = `${percent}%`;
}
