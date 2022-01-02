var backButton = document.querySelector("#goBack");
var clearButton = document.querySelector("#Clear");

function initScores() {
    //highscore stuff
    
    var storedScores = JSON.parse(localStorage.getItem("highscore"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedScores !== null) {
        scores = storedScores;
    }

    renderHighscores();
}
// make the scores show up on the screen
var scores = [];
var scoreList = document.querySelector("#scoreList");

function renderHighscores() {
    scoreList.innerHTML = "";

    for(let i = 0; i < scores.length; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i];
        scoreList.appendChild(li);
    }
   

}
function storeScores() {
    localStorage.setItem("highscore", JSON.stringify(scores));
}

backButton.addEventListener('click', () => {
    window.location.href='./index.html';
});

clearButton.addEventListener('click', () => {
    scores = [];
    storeScores();
    renderHighscores();
})

initScores();