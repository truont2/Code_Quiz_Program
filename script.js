var times = document.querySelector("#time"); //for the counter
var title = document.querySelector('#card-title'); //heading
var card = document.querySelector('#container'); //div vontianing quiz
var butt = document.querySelector("#start-button"); //start button
var todoList = document.querySelector("#todo-list"); //ordered list
var form = document.querySelector("#form"); //form
var de = document.querySelector("#d"); //description
var check = document.querySelector("#check"); //text for right or wrong 
var scoreInputArea = document.querySelector("#scoreInput"); //text input for the initials


var questions = ["question1", "question2", "question3"];
var arr1 = ["hello1", "idk1", "kaboom1","cry1"];
var arr2 = ["hello2", "idk2", "kaboom2","cry2"];
var arr3 = ["hello3", "idk3", "kaboom3","cry3"];
var finalArr = ["","","",""];
var options = [arr1, arr2, arr3, finalArr];
// each question will be the outer array index, its answers stored in a nested array
var answers = ["hello1", "idk2", "idk3"];
var score = 0;
var timeLeft = 100;
var timeSubtracted = 1;


function countdown() {
    times.textContent = 'time: ' + timeLeft;

    var timeInterval = setInterval(() => {
        // add something so that it stops counting down once the game ends
        if (timeLeft <= 0 ) {
            // same game over or something idk 
            clearInterval(timeInterval);
            highscore(); 
        } else {
            timeLeft = timeLeft - timeSubtracted;
            times.textContent = 'time: ' + timeLeft;
        }
    }, 1000);
}

function init() {
    title.textContent = "Code Quiz";
    card.appendChild(butt);

     
    butt.addEventListener("click", () => {
        countdown();
        question();

        for (let i = 1; i < arr1.length + 1; i++) {
            var curr = document.getElementById("li"+i);
            curr.textContent = arr1[i-1];
            console.log(curr);
            
        }
        de.setAttribute("style", "display: none");
        butt.setAttribute("style", "display: none");
        // card.removeChild(card.childNodes[3]);
        // card.removeChild(card.childNodes[10]);
    });
}

// answer part {}
var q = 0;
function question() {
    //load up the first question then if they choose a option change the iteration 
    title.textContent = questions[q];
    title.setAttribute("style", "text-align: left");
    todoList.setAttribute("style", "display: block")
}

function change(id) {
    q++;
    question();

    // loads the corect list to load next list of questions
    var currentList;
    for (let i = 0; i < options.length; i++) {
        var item = document.getElementById("li2").innerHTML;  //returns content inside an element
        if (options[i].includes(item)) {
            currentList = options[i + 1]
            console.log("yello " + currentList)
        }
    }
    var chosen = document.getElementById(id).innerHTML;

    if(currentList == finalArr){
        compareAnsw(chosen);
        highscore();
    } else {
        for(let i = 0; i < currentList.length; i++) {
            var curr = document.getElementById("li"+ (i + 1));
            curr.textContent = currentList[i];
        }
        console.log("answer chosen " + chosen);
        compareAnsw(chosen);
          
    }
    return chosen;
}

function compareAnsw(answer) {
    console.log("answer = " + answers[q - 1]);
    if (answer === answers[q - 1]) {
        check.textContent = "Correct" + q;
        score++;
        setTimeout(() => {
            check.textContent="";
        }, 2000);
    } else {
        check.textContent = "WRONG" + q;
        timeLeft = timeLeft - 10;
        setTimeout(() => {
            check.textContent="";
        }, 2000);
    }
}

// functions below work on displaying highscore
function highscore() {
    timeSubtracted = 0;

    title.textContent = "All Done!"
    // card.removeChild(card.childNodes[8]);
    // removes the listed button options
    todoList.parentNode.removeChild(todoList); 

    // var descrip2 = document.createElement("p");
    // card.appendChild(descrip2);
    de.setAttribute("style", "display: block");
    de.textContent = `Your Final score is - ${timeLeft}`;

    // create text input area 
    var highscoreInput = document.createElement("input");
    highscoreInput.setAttribute("id", "scoreInput");
    highscoreInput.setAttribute("type","text");
    highscoreInput.setAttribute("placeholder", "input score")
    highscoreInput.setAttribute("name", "scoreInput")
    form.appendChild(highscoreInput);
    console.log(form.childNodes);
    var scoreList = document.createElement("ul");
    card.appendChild(scoreList);
    scoreList.setAttribute("id", "scoreList");
    // console.log("new created list tag" + scoreList); code is good up to here 
    initScores()
}

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
var scoreList1 = document.querySelector("scoreList");

function renderHighscores() {
    // scoreList1.innerHTML = "";

    for(let i = 0; i < scores.length; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i];
        scoreList1.appendChild(li);
    }
   

}
// store the scores 
function storeScores() {
    localStorage.setItem("highscore", JSON.stringify(scores));
}

//listen for click of a button to sotre scores by submitting the form \


form.addEventListener("submit", (event) => {
    event.preventDefault();
    // messing up rn 
    var userInitials = scoreInputArea.value.trim();
    console.log(userInitials + " +++++++++");

    if(userInitials == "") {
        return;
    }

    scores.push(`${userInitials} - ${score}`);
    scoreInputArea = "";

    storeScores();
    renderHighscores();

});

// clear list of scores 

init();