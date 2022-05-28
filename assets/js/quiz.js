// first, starts to give function to the quiz-button

var startingMinute = 10;
var time = startingMinute * 60;
var countdown = document.getElementById('timer')
var startButton = document.getElementById('quiz-btn')
var nextButton = document.getElementById('continue-btn')
var mainContentElement = document.getElementById('main-content')
var questionElement  = document.getElementById('question')
var answerButtons = document.getElementById('answer-btn')

var throwQuestion, questionIndex;


startButton.addEventListener('click', startQuiz)
// going to the next question
nextButton.addEventListener('click', () => {
    questionIndex++
    setQuestions()
})

function startQuiz() {
startButton.classList.add('hide')
throwQuestion = myQuestions.sort(() => Math.random() - .5)
questionIndex = 0
mainContentElement.classList.remove('hide')
setQuestions()
}

// Second, set the questions
function setQuestions() {
resetState()
showQuestion(throwQuestion[questionIndex])
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
      var button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
          button.dataset.correct = answer.correct
      }
    button.addEventListener('click', selectAnswer) 
    answerButtons.appendChild(button)
    })
}

function resetState() {
 nextButton.classList.add('hide')
 while (answerButtons.firstChild) {
     answerButtons.removeChild (answerButtons.firstChild)
 }
}

function selectAnswer() {
    if (throwQuestion.lengh > questionIndex + 1) {
    } else {
        startButton.innerText = 'Save'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')

}

var myQuestions = [
        {      
        question: 'How can a datatype be declared to be a constant type?',
        answers: [    
         { text: 'const', correct: true },
         { text: 'var', correct: false },
         { text: 'let', correct: false },
         { text: 'constant', correct: false }
                ] 
        },
        {
        question: 'Which of the following methods can be used to display data in some form using JavaScript?',
        answers: [    
        { text: 'document. Write ()', correct: false },
        { text: 'console.log()', correct: false },
        { text: 'window.Alert', correct: false },
        { text: 'All the above', correct: true }
                 ]   
        },
        {
        question: 'Which of the following keywords is used to define a variable in JavaScript?',
        answers: [    
        { text: 'var', correct: false },
        { text: 'let', correct: false },
        { text: 'Both A and B', correct: true },
        { text: 'constant', correct: false }
                 ]   
        },
        {
        question: 'Which of the following are closures in JavaScript?',
        answers: [    
        { text: 'Variables', correct: false },
        { text: 'Functions', correct: false },
        { text: 'Objects', correct: false },
        { text: 'All the above', correct: true }
                 ]   
        },
        {
        question: 'How do we write a comment in JavaScript?',
        answers: [    
        { text: '/* */', correct: false },
        { text: '//', correct: true },
        { text: '#', correct: false },
        { text: '$ $', correct: false }
               ]   
        },
    ]
       