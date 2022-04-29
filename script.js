// variables linking html to js 
let timerElement = $('#timer-count');
let startButton = $('#start-button');
let quizCard = $('#quiz-board');
let startCard = $('#start-board');
let decisionCard = $('#decision');
let choiceBtn = $('choiceBtn');

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
      // If time ran out, then the timer cleared and the lose game function is invoked 
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        quizIncomplete();
        }
    }, 1000);
}
// incrimentor ++ use that operator that incriments 

    // incrimenting the question variable 
    // index++ is what i need and figure out where i need to put it 
    // write a condition is index if its < questions.length 
    // i can put the check questions in one function to not separate the data.
    

    // if the index is less than the questionslength, then this entire function will go 

function startGame() {
        
        // clears out previous questions and choices
        // $('quizCard').html();
        // $('listItem ').html();
        // $('listItem').empty();
        // listItem.remove();
       

        // to loop through entire questions array
        for (let i = 0; i < questions.length; i++) {
        // appends question title only
        let currentQuestion = questions[index].title;
        var currentChoices = questions[index].choices;
        quizCard.text(currentQuestion);
        }
    
        
    // changing the variable of currentChoices to just current question 
        // New for each for question choices
    currentChoices.forEach(function (newItem) {
        // $('li').remove();
        
    // variable creates a list item 
     listItem = $('<li>');

    // assigns listItem a class to be styled 
    listItem.attr('class', 'choiceBtn'); 
    // each listItem will now have some textContent 
    listItem.text(newItem); 
    
    // on the quizCard an ordered list will be created and attached to it 
    quizCard.append(createOl);

    createOl.append(listItem);

    // the click event will now redirect it to a different function 
    listItem.on("click", (nextQuestion));
        
//   // once the index stores the value of the index, the if else function runs 
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
//     });
        
//     })
    
    
})
}

function nextQuestion (event) {

        // decision stores the value of what got clicked 
        let decision = event.target;

        console.log(decision)
        console.log(index);
        console.log(questions[index].title);
        console.log(questions[index].choices);
        console.log(questions[index].answer);
    if (decision.matches('li')){
    
        if (decision.textContent == questions[index].answer) {
            score++;
            // quizCard.setText = ("");
            decisionCard.text('CORRECT!' + ' You have '+ score + '/5');
            // index++;
    
        } else {
            decisionCard.text('INCORRECT!' + ' You have '+ score + '/5');
            timerCount -= penalty;
            // quizCard.setText = ("");
            // index++; 
        }
    } 
    // adds 1 to the index once decision has been made 
    index++;
    


        if (index >= questions.length){

            quizComplete();
    
        } else {
            startGame();
        }
}
// The quizIncomplete function is called when timer reaches 0
function quizIncomplete() {

    quizCard.text('TIME IS UP!');
    startButton.disabled = false;
}

// add a link here to a bootstrap form for highscore 
function quizComplete() {
    

    // create a p element to be added on the quizCard with the following text
    let createP = $('<p>');
    createP.text('QUIZ COMPLETED!');
    createP.attr('class', 'complete-p');
    quizCard.append(createP);

    if (timerCount >=0 ){
        var finalScore = timerCount;

    clearInterval(timer);
    
    }

    // create a label to store the initials upon completion and possibly to style later with new ids
    let createLabel = $("<label>");
    createLabel.attr("id", "createLabel");
    createLabel.text("Enter your initials: ");

    quizCard.append(createLabel);

    // create an input section for the label so they are able to type into the empty text field and possibly to style later with new ids
    let createInput = $("<input>");
    createInput.attr("type", "text");
    createInput.attr("id", "initials");
    createInput.textContent = "";

    quizCard.append(createInput);

    // create a submit button 
    let createSubmit = $("<button>");
    createSubmit.attr("type", "submit");
    createSubmit.attr("id", "Submit");
    createSubmit.text("Submit");

    quizCard.append(createSubmit);

    // figure out how to put this in the highscore section 
    // Event listener to capture initials and local storage for initials and score
    createSubmit.on("click", function () {
        let initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            let storedScore = {
                initials: initials,
                score: finalScore
            }
            console.log(storedScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(storedScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
        }
    });
}

startButton.on("click", startBtn);