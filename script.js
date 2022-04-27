// variables linking html to js 
let timerElement = $('#timer-count');
let startButton = $('#start-button');
let quizCard = $('#quiz-board');
let startCard = $('#start-board');
let decisionCard = $('#decision');

// an array of questions and choices 
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// timer variables 
let isComplete = false;
let timer;
let timerCount;
let penalty = 15;

let createOl = $('<ol>');
let score = 0;

function startGame() {
    isComplete = false;
    timerCount = 90;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startCard.hide();
    quizCard.show();
    quizQuestions() 
    startTimer()
}

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.text(timerCount);
        if (timerCount >= 0) {
        // Tests if win condition is met
        if (isComplete && timerCount > 0) {
          // Clears interval and stops timer
            clearInterval(timer);
            // quizComplete();
        }
        }
      // If time ran out, then the timer cleared and the lose game function is invoked 
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        quizIncomplete();
        }
    }, 1000);
}

function quizQuestions() {

// incrimentor ++ use that operator that incriments 

    // incrimenting the question variable 
    // questionIndex++ is what i need and figure out where i need to put it 
    // write a condition is questionIndex if its < questions.length 
    // i can put the check questions in one function to not separate the data.
    let questionIndex = 0;
    let checkChoice;

    if (questionIndex < questions.length) {

        // Appends question title only
        let currentQuestion = questions[questionIndex].title;
        var currentChoices = questions[questionIndex].choices;
        quizCard.text(currentQuestion);

        // New for each for question choices
    currentChoices.forEach(function (newItem, questionIndex) {
    // variable creates a list item 
    let listItem = $('<li>');

    // assigns listItem a class to be styled 
    listItem.attr('class', 'choiceBtn'); 
    // each listItem will now have some textContent 
    listItem.text(newItem); 
    
    // on the quizCard an ordered list will be created and attached to it 
    quizCard.append(createOl);

    createOl.append(listItem);

    // the click event will now redirect it to a different function 
    listItem.on("click", function(event){

        let decision = event.target;

        console.log(decision)
        console.log(questions[questionIndex].answer);
        if (decision == questions[questionIndex].answer) {
            
            decisionCard.text('CORRECT!');
            score++;
        } else {
            decisionCard.text('INCORRECT!');
            timerCount -= penalty;
        }
    });
    
    })
    };
    
   
    

}

// function checkChoice(e, questionIndex) {

//     let decision = e.target;
//     console.log(decision);
//     // console.log(decision.textContent); 
//     // console.log(questions[questionArray].answer) 
//     if (decision.matches('li')) {
//         // score++; 
        
//        if (decision.textContent == questions[questionIndex].answer ) {
//         decisionCard.text('CORRECT!');
       
//        } else {
//            decisionCard.text('INCORRECT!');
        
//        }

//     }; 

//     // Progresses onto the next question 
  

// } 

// The quizIncomplete function is called when timer reaches 0
function quizIncomplete() {

    quizCard.text('TIME IS UP!');
    startButton.disabled = false;
}

// function quizComplete {

// }

startButton.on("click", startGame);