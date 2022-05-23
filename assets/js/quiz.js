var myQuestions = [
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: {
            1:	'const',
            2:	'var',
            3:	'let',
            4:	'constant',
        },
        correctAnswer: '1'
    },
    {
        question: "Which of the following methods can be used to display data in some form using JavaScript?",
        answers: {
            1:	'document. Write ()',
            2:	'console.log ()',
            3:	'window. Alert ()',
            4:	'All the above',
        },
        correctAnswer: '4'
    },

    {
        question: "Which of the following keywords is used to define a variable in JavaScript?",
        answers: {
            1:	'var',
            2:	'let',
            3:	'Both A and B',
            4:	'None of the above',
        },
        correctAnswer: '3'
    },

    {
        question: "Which of the following are closures in JavaScript?",
        answers: {
            1:	'Variables',
            2:	'Functions',
            3:	'Objects',
            4:	'All the above',
        },
        correctAnswer: '4'
    },

    {
        question: "How do we write a comment in JavaScript?",
        answers: {
            1:	'/* */',
            2:	'//',
            3:	'#',
            4:	'$ $',
        },
        correctAnswer: '2'
    },
]

function startQuiz(questions, quizContent, resultsContent, submitButton) {
    function showQuestions(questions, quizContent) {
        // code will write here
    }

    function showResults(questions, quizContent, resultContent){
        // type code here
    }

    // show questions
    showQuestions(questions, quizContent);

    // when user clicks submit, show results
    submitButton.onclick = function(){
    showResults(questions, quizContent, resultsContent);
    }
}