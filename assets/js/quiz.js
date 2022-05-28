var CodeQuiz = (function () {
    var _timerElement;
    var _startButton;
    var _nextButton;
    var _saveButton;
    var _viewHighScoresButton;
    var _quizContent;
    var _answersContainer;
    var _answerFeedback;
    var _questionElement;
    var _highScoresContainer;
    var _highScoresTableBody;
    var _throwQuestion;
    var _questionIndex;
    var _initialTimeSeconds = 10;
    var _penaltyTimeSeconds = 10;
    var _timeSeconds;
    var _timer;
    var _score;
    var _gameFinished = false;
    var _highScores;
    var _myQuestions = [
      {
        question: 'How can a datatype be declared to be a constant type?',
        answers: [
          { text: 'const', correct: true },
          { text: 'var', correct: false },
          { text: 'let', correct: false },
          { text: 'constant', correct: false },
        ],
      },
      {
        question: 'Which of the following methods can be used to display data in some form using JavaScript?',
        answers: [
          { text: 'document. Write ()', correct: false },
          { text: 'console.log()', correct: false },
          { text: 'window.Alert', correct: false },
          { text: 'All the above', correct: true },
        ],
      },
      {
        question: 'Which of the following keywords is used to define a variable in JavaScript?',
        answers: [
          { text: 'var', correct: false },
          { text: 'let', correct: false },
          { text: 'Both A and B', correct: true },
          { text: 'constant', correct: false },
        ],
      },
      {
        question: 'Which of the following are closures in JavaScript?',
        answers: [
          { text: 'Variables', correct: false },
          { text: 'Functions', correct: false },
          { text: 'Objects', correct: false },
          { text: 'All the above', correct: true },
        ],
      },
      {
        question: 'How do we write a comment in JavaScript?',
        answers: [
          { text: '/* */', correct: false },
          { text: '//', correct: true },
          { text: '#', correct: false },
          { text: '$ $', correct: false },
        ],
      },
    ];
  
    function init() {
      // first, starts to give function to the quiz-button
      _timerElement = document.querySelector('#timer h1');
      _startButton = document.getElementById('quiz-btn');
      _nextButton = document.getElementById('continue-btn');
      _saveButton = document.getElementById('save-btn');
      _viewHighScoresButton = document.getElementById('highscore-btn');
      _quizContent = document.getElementById('quiz-content');
      _answersContainer = document.getElementById('answers-container');
      _highScoresContainer = document.querySelector('#high-scores');
      _highScoresTableBody = document.querySelector('#high-scores table tbody');
      _answerFeedback = document.getElementById('answer-feedback');
      _questionElement = document.getElementById('question');
  
      _highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
  
      // show initial time
      _timerElement.textContent = 'Timer: ' + _initialTimeSeconds;
  
      initEventListeners();
    }
  
    function initEventListeners() {
      _startButton.addEventListener('click', startQuiz);
  
      // going to the next question
      _nextButton.addEventListener('click', goToNextQuestion);
  
      _saveButton.addEventListener('click', endGame);
  
      _viewHighScoresButton.addEventListener('click', showResults);
    }
  
    function startQuiz() {
      // hide start button
      _startButton.classList.add('hide');
  
      // sort questions by random order
      _throwQuestion = _myQuestions.sort(() => Math.random() - .5);
      _questionIndex = 0;
  
      // show question
      _quizContent.classList.remove('hide');
  
      // show answers
      _answersContainer.parentElement.classList.remove('hide');
  
      // hide high scores
      _viewHighScoresButton.classList.add('hide');
      _highScoresContainer.classList.add('hide');
  
      // reset score
      _score = 0;
  
      // start timer
      _timeSeconds = _initialTimeSeconds;
      _timer = setInterval(timerInterval, 1000);
  
      setQuestions();
    }
  
    function timerInterval() {
      _timeSeconds--;
      _timerElement.textContent = 'Timer: ' + _timeSeconds;
  
      if (_timeSeconds === 0 || _gameFinished) {
        clearInterval(_timer);
  
        if (_timeSeconds === 0) {
            alert("Game Over!");
            endGame();
        }
      }
    }
  
    function goToNextQuestion() {
      _questionIndex++;
      setQuestions();
    }
  
    function setQuestions() {
      // hide next button
      _nextButton.classList.add('hide');
  
      showQuestion();
    }
  
    function showQuestion() {
      var question = _throwQuestion[_questionIndex];
  
      // set question
      _questionElement.innerText = question.question;
  
      // clear answers container
      _answersContainer.innerHTML = '';
  
      // show answers
      question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
  
        _answersContainer.appendChild(button);
      });
  
      // hide answer feedback
      _answerFeedback.classList.add('hide');
    }
  
    function selectAnswer(e) {
      if (_throwQuestion.length -1 <= _questionIndex) {
        _saveButton.classList.remove('hide');
        _nextButton.classList.add('hide');
      } else {
        _nextButton.classList.remove('hide');
      }
  
      var el = e.target;
      var isCorrect = el.dataset.correct === 'true';
      var text = isCorrect ? "You picked the correct answer" : "Wrong answer!";
  
      if (isCorrect) {
        _score++;
      } else {
        _timeSeconds -= _penaltyTimeSeconds;
      }
  
      _answerFeedback.textContent = text;
      _answerFeedback.classList.remove('green');
      _answerFeedback.classList.remove('red');
      _answerFeedback.classList.add(isCorrect ? 'green' : 'red');
      _answerFeedback.classList.remove('hide');
    }
  
    function endGame() {
      _gameFinished = true;
  
      // ask name
      var name = window.prompt("Enter your name");
      var time = _initialTimeSeconds - _timeSeconds;
      var results = { name, score: _score, time };
      _highScores.push(results);
  
      showResults();
      saveResults();
  
      _startButton.classList.remove('hide');
      _saveButton.classList.add('hide');
      _nextButton.classList.add('hide');
    }
  
    function showResults() {
      _quizContent.classList.add('hide');
      _answersContainer.parentElement.classList.add('hide');
      _highScoresContainer.classList.remove('hide');
  
      _highScoresTableBody.innerHTML = '';
  
      _highScores.forEach((results) => {
        var row = document.createElement('tr');
  
        Object.values(results).forEach((value) => {
          var column = document.createElement('td');
          column.innerText = value;
  
          row.appendChild(column);
        });
  
        _highScoresTableBody.appendChild(row);
      });
    }
  
    function saveResults() {
      localStorage.setItem('highScores', JSON.stringify(_highScores));
    }
  
    return {
      init,
    };
  })();
  
  CodeQuiz.init();