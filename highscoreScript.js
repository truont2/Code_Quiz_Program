// script controls actions once user is on the highscore page with the lists of scores

// grabs the buttons to clear scores or start the game over 
var backButton = document.querySelector("#goBack");
var clearButton = document.querySelector("#Clear");

// grabs the list element to display the scores
var scoreList = document.querySelector("#scoreList");

// grabs any stored scores and activates function to render the scores if present
function initScores() {
    //highscore stuff
    //returns whole object that is stored as an object 
    var storedScores = JSON.parse(localStorage.getItem("highscore"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedScores !== null) {
        scores = storedScores;
    }

    renderHighscores();
}


var scores = [];
// function makes the scores show up on the screen
function renderHighscores() {
    scoreList.innerHTML = "";
    for(let i = 0; i < scores.length; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i];
        li.setAttribute("style", "list-style: none; font-size: 20px");
        scoreList.appendChild(li);
    }
   

}

// function stores scores that were submitted by the user into the local storage
function storeScores() {
    localStorage.setItem("highscore", JSON.stringify(scores));
}

// redirects page to starting page if clicked
backButton.addEventListener('click', () => {
    window.location.href='./index.html';
});

// clears highscores list if clicked
clearButton.addEventListener('click', () => {
    scores = [];
    storeScores();
    renderHighscores();
})

// initalized highscore page when the page loads
initScores();