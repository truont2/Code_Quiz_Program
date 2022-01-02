var times = document.querySelector("#time"); //for the counter
var title = document.querySelector('#card-title'); //heading
var card = document.querySelector('#container'); //div vontianing quiz
var butt = document.querySelector("#start-button"); //start button
var todoList = document.querySelector("#todo-list"); //ordered list
var formList = document.querySelector("#formList"); //form
var de = document.querySelector("#d"); //description
var answerStatus = document.querySelector("#answerStatus"); //text for right or wrong 
var textInput = document.getElementById("input");
var submitButton = document.querySelector("#submitButton");
var highscore1 = document.querySelector("#highscore");

var questions = ["question1", "question2", "question3"];
var arr1 = ["hello1", "idk1", "kaboom1","cry1"];
var arr2 = ["hello2", "idk2", "kaboom2","cry2"];
var arr3 = ["hello3", "idk3", "kaboom3","cry3"];
var finalArr = ["","","",""];
var options = [arr1, arr2, arr3, finalArr];
// each question will be the outer array index, its answers stored in a nested array
var answers = ["hello1", "idk2", "idk3"];
var timeLeft = 100;
var timeSubtracted = 1;
var scores = [];


function countdown() {
    times.textContent = 'Time: ' + timeLeft;

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

    var storedScores = JSON.parse(localStorage.getItem("highscore"));
    
    if(storedScores !== null) {
        scores = storedScores;
    }

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
        } else {
            currentList = options[i];
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
        compareAnsw(chosen);
          
    }
    return chosen;
}

function compareAnsw(answer) { 
    console.log("answer = " + answers[q - 1]);
    if (answer === answers[q - 1]) {
        answerStatus.textContent = "Correct";
        setTimeout(() => {
            answerStatus.textContent="";
        }, 2000);
    } else {
        answerStatus.textContent = "WRONG";
        timeLeft = timeLeft - 10;
        setTimeout(() => {
            answerStatus.textContent="";
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

    textInput.classList.remove("hide");
    submitButton.classList.remove('hide');
    // create text input area 
    // var highscoreInput = document.createElement("input");
    // highscoreInput.setAttribute("id", "scoreInput");
    // highscoreInput.setAttribute("type","text");
    // highscoreInput.setAttribute("placeholder", "input score")
    // highscoreInput.setAttribute("name", "scoreInput")
        //need to target form itself
    // formList.appendChild(highscoreInput);

    // var scoreInputArea = document.querySelector("#scoreInput"); //text input for the initials
    // console.log("issue" + scoreInputArea);

    // var scoreList = document.createElement("ul");
    // card.appendChild(scoreList);
    // scoreList.setAttribute("id", "scoreList");
    // initScores()
}


// function initScores() {
//     //highscore stuff
    
//     var storedScores = JSON.parse(localStorage.getItem("highscore"));

//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedScores !== null) {
//         scores = storedScores;
//     }

//     renderHighscores();
// }
// // make the scores show up on the screen
// var scores = [];
// var scoreList = document.querySelector("scoreList");

// function renderHighscores() {
//     scoreList.innerHTML = "";

//     for(let i = 0; i < scores.length; i++) {
//         var li = document.createElement("li");
//         li.textContent = scores[i];
//         scoreList.appendChild(li);
//     }
   

// }

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    
    var userInitials = textInput.value.trim();

    if(userInitials == "") {
        return;
    }

    scores.push(`${userInitials} - ${timeLeft}`);
    textInput.value = "";

    storeScores();

});

// store the scores 
function storeScores() {
    localStorage.setItem("highscore", JSON.stringify(scores));
}

//listen for click of a button to sotre scores by submitting the form \

highscore1.addEventListener("click", () => {
    window.location.href='./highscore.html';
});




// clear list of scores 

init();