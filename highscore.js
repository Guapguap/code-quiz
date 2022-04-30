// global scopes to connect html to js 
let quizCard = $('#quiz-board');
let backBtn = $('#backButton');
let clearBtn = $('#clearButton');


// created a variable to retrieve from the local storage
let allScores = localStorage.getItem("allScores");
// reassigning the variable to that it takes the values stored in the json string
allScores = JSON.parse(allScores);

// created an conditional statement when the score is retrieved  to perform the for loop 
if (allScores) {

    // this for loop goes through the local storage and displays it through the newly created li 
    for (let i = 0; i < allScores.length; i++) {

        // same concept as the quizCard in the start game function 
        let createLi = $('<li>');
        createLi.text(allScores[i].initials + " " + allScores[i].score);
        
        // appends it to the board to be displayed 
        quizCard.append(createLi);

    }
}

// button to clear and reset the localStorage 
clearBtn.on("click", function () {
    localStorage.clear();
    location.reload();
});

// button to go back to homepage to play again if they do want to hit the back window key 
backBtn.on("click", function (){
    window.location.assign("index.html");
});