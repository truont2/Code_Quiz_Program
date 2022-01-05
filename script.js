// selects various html elements by for later use
var times = document.querySelector("#time"); //Counter display
var title = document.querySelector('#card-title'); //heading
var card = document.querySelector('#container'); //div contianing quiz
var startBtn = document.querySelector("#start-button"); //start button
var answerList = document.querySelector("#answer-list"); //ordered list of answers
var formList = document.querySelector("#formList"); //form
var description = document.querySelector("#description"); //Game description
var answerStatus = document.querySelector("#answerStatus"); //text for right or wrong 
var textInput = document.querySelector("#input"); // input element on highscore page
var submitButton = document.querySelector("#submitButton"); //for submitting score button
var highscore = document.querySelector("#highscore"); //for button that directs to highscore page
var scoreInput = document.querySelector("label"); //labeling for highscore input element

// buttons for each question
var btn1 = document.getElementById('li1');
var btn2 = document.getElementById('li2');
var btn3= document.getElementById('li3');
var btn4 = document.getElementById('li4');

//array of objects for each question
const questions = [
    {
        question: "How do you add elements to the end of an array?",
        opt1: ".push()", 
        opt2: ".unshift()", 
        opt3: ".pop()",
        opt4: ".random()", 
        correct: ".push()"
    },
    {
        question: "What is the correct method of retrieving a value from an object called obj with property name?",
        opt1: "obj()", 
        opt2: "obj[name]", 
        opt3: "name.obj",
        opt4: "object.prop(name)", 
        correct: "obj[name]" 
    }
    ,
    {
        question: "How would you generate a random number between 0 and 10?",
        opt1: "Math.Random()", 
        opt2: "Math.random() * 10", 
        opt3: "Math.floor(Math.Random() * 10) + 1",
        opt4: "Math.floor(Math.random() * 10) + 1", 
        correct: "Math.floor(Math.random() * 10) + 1" 
    }
    ,
    {
        question: "What API will allow you to store items into the local browser storage?",
        opt1: "localStorage = value", 
        opt2: "localStorage.setItem()", 
        opt3: "localStorage.getItem()",
        opt4: "localStorage.store()", 
        correct: "localStorage.setItem()" 
    }
    
    ,
    {
        question: "______ occurs whenever an event occurs on an element, at first place it will run the handler on it, then its parent, then on other ancestors.",
        opt1: "Bubbling", 
        opt2: "Scope", 
        opt3: "Iterating",
        opt4: "Shadowing", 
        correct: "Bubbling" 
    }
    ,
    {
        question: "_______ is a open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        opt1: "Moment", 
        opt2: "jQuery", 
        opt3: "Bootstrap",
        opt4: "React", 
        correct: "Bootstrap" 
    }
    ,
    {
        question: "Out of the options, what would you use to select a element using javascript?",
        opt1: "jquery.(element)", 
        opt2: "document.querySelector('element')", 
        opt3: "$('element')",
        opt4: "document.select(element)", 
        correct: "document.querySelector('element')" 
    }
];


//variable determines start time
var timeLeft = 100;
// variable used to control time decrement
var timeSubtracted = 1;
//variable stores highscores for later use when displaying scores
var scores = [];

// function initates and displays counter 
function countdown() {
    times.textContent = 'Time: ' + timeLeft;

    var timeInterval = setInterval(() => {
        if (timeLeft <= 0 ) {
            times.textContent = 0;
            clearInterval(timeInterval);
            highscoreDisplay(); 
        } else {
            timeLeft = timeLeft - timeSubtracted;
            times.textContent = 'time: ' + timeLeft;
        }
    }, 1000);
}

// variable used to iterate through questions variable
var q = 0;
// function renders any stored scores and sets up game starting page
function init() {
    var storedScores = JSON.parse(localStorage.getItem("highscore"));
    
    // updates scores array with previous scores if anything is stored in the local storage
    if(storedScores !== null) {
        scores = storedScores;
    }

    // activates the game if the start button is clickecd
    startBtn.addEventListener("click", () => {
        title.setAttribute("style", "font-family: San serif");
        countdown();
        question();

        // displays questiion and its answer options
        title.innerHTML = questions[q].question;
        btn1.innerHTML = questions[q].opt1;
        btn2.innerHTML = questions[q].opt2;
        btn3.innerHTML = questions[q].opt3;
        btn4.innerHTML = questions[q].opt4;

        // removes items from display once passed start page
        description.setAttribute("style", "display: none");
        startBtn.setAttribute("style", "display: none");
    });
}

// changes the question displayed
function question() {
    //load up the first question then if they choose a option change the iteration 
    title.textContent = questions[q];
    title.classList.add("question");
    title.classList.remove("underline");
    answerList.setAttribute("style", "display: block")
}

//function runs when answer buttons are clicked
// compares answer and determines whether to update the next question or end the game.
function change(id) {
    var chosen = document.getElementById(id).innerHTML;

    // updates question if timer is greater than 0
    // if not ends the game
    if(q == questions.length - 1 ||timeLeft <= 0){
        times.textContent = 0;
        compareAnsw(chosen);
        highscoreDisplay();
    } else {
        compareAnsw(chosen);
        q++;
        question();
        title.innerHTML = questions[q].question;
        btn1.innerHTML = questions[q].opt1;
        btn2.innerHTML = questions[q].opt2;
        btn3.innerHTML = questions[q].opt3;
        btn4.innerHTML = questions[q].opt4;
    }
    return chosen;
}

// compares answer chosen by user and the correct answer
// displays whether the answer chosen is correct or not
// setTimeout allows answer status to disappear after 2 seconds
function compareAnsw(answer) { 

    // displays answer status
    if (answer === questions[q].correct) {
        answerStatus.textContent = "Correct";

        // this removes answer status after 2 seconds
        setTimeout(() => {
            answerStatus.textContent="";
        }, 2000);
    } else {
        answerStatus.textContent = "WRONG";

        // if the time scores is greater than 10 subtract 10
        // else, timeleft - 10 when timeleft = 10 will result in a loss and a score of 0
        if(timeLeft >= 10) {
            timeLeft = timeLeft - 10;
        } else {
            timeLeft = 0;
        }

        setTimeout(() => {
            answerStatus.textContent="";
        }, 2000);
    }
}



// functions below displays highscore page for user to input initials
function highscoreDisplay() {
    //stops time decrement
    timeSubtracted = 0;
    title.textContent = "All Done!";
    title.classList.remove("question");
    answerList.parentNode.removeChild(answerList); 

    description.setAttribute("style", "display: block; font-size: 20px");
    description.textContent = `Your Final score is - ${timeLeft}`;

    // removes hide class which allows elements to be displayed
    textInput.classList.remove("hide");
    scoreInput.classList.remove("hide");
    submitButton.classList.remove('hide');
}

// submits and stores highscores to be displayed later
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    
    var userInitials = textInput.value.trim();

    if(userInitials == "") {
        return;
    }

    scores.unshift(`${userInitials} - ${timeLeft}`);
    textInput.value = "";

    storeScores();

});

// store the highscores and initials  
function storeScores() {
    localStorage.setItem("highscore", JSON.stringify(scores));
}

//listen for click of a button to sotre scores by submitting the form \

// redirects user if highscore button is clicked on the top left
highscore.addEventListener("click", () => {
    window.location.href='./highscore.html';
});

// initiates game starting page when page is loaded
init();