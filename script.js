// variables linking html to js 
let timerElement = $('#timer-count');
let timerBoard = $('div.card.timer');
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
let listItem = $('<li>');
let score = 0;
let index = 0;

// variable to collect the localStorage 
let allScores = localStorage.getItem("allScores");

// hide it in the beginning to make it look more presentable 
decisionCard.hide();

function startBtn() {
    isComplete = false;
    timerCount = 90;
    
    // hides and shows the selected variables 
    startButton.hide();
    startCard.hide();
    decisionCard.show();
    quizCard.show();

    // invokes these functions when button is pressed 
    startQuiz() 
    startTimer()
}

// addEventListener when the button is clicked. it invokes the startBtn function 
startButton.on("click", startBtn);

// this timer function will perform the following code and invoke quizIncomplete if not completed in the allotted time 
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
      // If time ran out, then the timer and questions are cleared and the incompleteQuiz function is invoked 
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        $('li').remove();
        quizIncomplete();
        }
    }, 1000);
}

// main function displaying the questions and choices 
function startQuiz() {

        // to loop through entire questions array
        for (let i = 0; i < questions.length; i++) {
        // appends question title only
        let currentQuestion = questions[index].title;
        var currentChoices = questions[index].choices;
        quizCard.text(currentQuestion);
        }
    
    // assigning the value of currentChoices to each li with the argument 
    currentChoices.forEach(function (newItem) {
        
    // variable creates a list item 
    listItem = $('<li>');

    // assigns listItem a class to be styled 
    listItem.attr('class', 'choiceBtn'); 

    // each listItem will now have some textContent 
    listItem.text(newItem); 
    
    // on the quizCard an ordered list will be created and attached to it 
    quizCard.append(createOl);

    // the new list items will be appended to the ordered list
    createOl.append(listItem);

    // the click event will now redirect it to the nextQuestion function
    listItem.on("click", nextQuestion);
})
}

// this function will determine if the selected li is correct or not, incriment the index by 1 to move onto the next question / choices, and clear out the previous li and invoke the startQuiz function again to repeat the process until all questions are answered 
function nextQuestion (event) {

        // decision stores the value of what got clicked 
        let decision = event.target;

        console.log(decision)
        console.log(index);
        console.log(questions[index].title);
        console.log(questions[index].choices);
        console.log(questions[index].answer);

    // if statement to determine if the selected li is correct or not     
    if (decision.matches('li')){
    
        // if true then the following code will perform 
        if (decision.textContent == questions[index].answer) {
            score++;
            decisionCard.text('CORRECT!' + ' You have '+ score + '/5');
    
        // if they do not match then the following code will perform 
        } else {

            decisionCard.text('INCORRECT!' + ' You have '+ score + '/5');
            timerCount -= penalty;

        }
    } 

    // adds 1 to the index once decision has been made 
    index++;
    
    // this if else statement stops the questions when it is greater than or equal to and invokes the quizComplete function 
    // if it is not done with the questions, it removes all the previous li that were appended and invokes the start game function again with the next questions 
        if (index >= questions.length){

            quizComplete();
    
        } else {
            $('li').remove();
            startQuiz();
        }
}

// The quizIncomplete function is called when timer reaches 0
// shows the startbutton again to take the retake the quiz 
function quizIncomplete() {

    quizCard.text('TIME IS UP! Click the start button above again to retake the quiz.');
    startButton.show();
    startButton.disabled = false;

    quizComplete();
}

// add a link here to a bootstrap form for highscore 
function quizComplete() {

    timerBoard.hide()
    quizCard.hide();
    startCard.show();

    // create a p element to be added on the startCard with the following text
    let createP = $('<p>');
    createP.text('QUIZ COMPLETED!');
    createP.attr('class', 'complete-p');
    startCard.append(createP);

    if (timerCount >=0 ){

        var timeScore = timerCount;
        clearInterval(timer);
        decisionCard.text('Your highscore is: ' + timeScore);

    }

    

    // create a label to store the initials upon completion
    let createLabel = $('<label>');
    createLabel.attr('id', 'createLabel');
    createLabel.text('Enter your initials: ');

    startCard.append(createLabel);

    // attempt at making this only vanilla JS to correct the undefined value in input 
    // create an input section for the label so they are able to type into the empty text field
    let createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('id', 'initials');
    createInput.textContent = '';

    startCard.append(createInput);
    
    // create a submit button 
    let createSubmit = $('<button>');
    createSubmit.attr('type', 'submit');
    createSubmit.attr('class', 'submitBtn');
    createSubmit.attr('id', 'Submit');
    createSubmit.text('Submit');

    startCard.append(createSubmit);

    // figure out how to put this in the highscore section 
    // Event listener to capture initials and local storage for initials and score
    createSubmit.on('click', function () {

        console.log(createInput.value);
        let initials = createInput.value;

            let finalScore = {
                initials: initials,
                score: timeScore,
            }
            console.log(finalScore);
            
            if (!allScores) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.assign("highscore.html");
        
    });

}

