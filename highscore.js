let initials = $('#text');
let highscore = $('#highscore');
let backBtn = $('#backButton');
let clearBtn = $('#clearButton');


// highscore.textContent = 'Your Highscore:' + localStorage.getItem("finalScore", finalScore);

clearBtn.on("click", function () {
    localStorage.clear();
    location.reload();
});

backBtn.on("click", function (){
    window.location.assign("index.html");
});