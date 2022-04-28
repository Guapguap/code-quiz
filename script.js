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
let penalty = 10;

let createOl = $('<ol>');
let score = 0;
let index = 0;

function startBtn() {
    isComplete = false;
    timerCount = 90;
    
    // hides and shows the selected variables 
    startButton.hide();
    startCard.hide();
    quizCard.show();

    // invokes these functions when button is pressed 
    startGame() 
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

function startGame(next) {
// incrimentor ++ use that operator that incriments 
    index += next
    // incrimenting the question variable 
    // index++ is what i need and figure out where i need to put it 
    // write a condition is index if its < questions.length 
    // i can put the check questions in one function to not separate the data.
    

    // if the index is less than the questionslength, then this entire function will go 
        // Appends question title only
        let currentQuestion = questions[index].title;
        var currentChoices = questions[index].choices;
        quizCard.text(currentQuestion);

        // New for each for question choices
    currentChoices.forEach(function (newItem) {
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
        // decision stores the value of what got clicked 
        let decision = event.target;

        console.log(decision)
        console.log(questions[index].answer);
        if (decision.textContent === questions[index].answer) {
            score++;
            decisionCard.text('CORRECT!' + ' You have '+ score + '/5');
            next(1);
            // nextQuestion();

        } else {
            decisionCard.text('INCORRECT!' + ' You have '+ score + '/5');
            timerCount -= penalty; 
            next(1);
            // nextQuestion();
        };
    
  
  // once the index stores the value of the index, the if else function runs 
//   if (index < questions.length) { 
//     // questionIndex = questions.length - 1;
//     index++ 
//     console.log(index);
//   } else if (index > questions.length) {

//     // invokes the quizComplete function 
//     quizComplete();
//   }
//     quizCard = questions[index].title
//     currentChoices = questions[index].choices
// //   currentImage = images[index];
    });
        
    })
    
    
};

// function nextQuestion () {
//     if (index < questions.length) {
//         index++
//     }
// }
// The quizIncomplete function is called when timer reaches 0
function quizIncomplete() {

    quizCard.text('TIME IS UP!');
    startButton.disabled = false;
}

function quizComplete() {
    let createP = $('<p>');
    createP.text('QUIZ COMPLETED!');
    createP.attr('class', 'complete-p');
    quizCard.append(createP);
}

startButton.on("click", startBtn);