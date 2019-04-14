var qANDa = [{
        question: "What was the name of the LOTR hobbit that was designated as the ringbearer?",
        answers: ["Samwise Gamgee",
            "Frodo Baggins",
            "Meriadoc Brandybuck",
            "Peregrin Took"
        ],
        correct: 1,
        comment: "Nephew and heir of Bilbo Baggins.",
        imageFile: "frodogif.webp"
    },
    {
        question: "What was the name of the LOTR hobbit that stabbed Shelob?",
        answers: ["Samwise Gamgee",
            "Frodo Baggins",
            "Meriadoc Brandybuck",
            "Peregrin Took"
        ],
        correct: 0,
        comment: "He was also Frodo's gardener.",
        imageFile: "samgif.webp"
    },
    {
        question: "What was the name of the LOTR hobbit that rode with the Rohirrim?",
        answers: ["Samwise Gamgee",
            "Frodo Baggins",
            "Meriadoc Brandybuck",
            "Peregrin Took"
        ],
        correct: 2,
        comment: "He later became the Master of Buckland.",
        imageFile: "merrygif.webp"
    },
    {
        question: "What was the name of the LOTR hobbit that looked into the Palantir?",
        answers: ["Samwise Gamgee",
            "Frodo Baggins",
            "Meriadoc Brandybuck",
            "Peregrin Took"
        ],
        correct: 3,
        comment: "Fool of a Took!!!!",
        imageFile: "tookgif.webp"
    }

];


var intervalFunction = function() {
    console.log("intervalFunction called. time: ", timeLimit);

    timeLimit--;
    $("#timer-sec").html(timeLimit);



    if (timeLimit === 0) {
        console.log("timeLimit found to be zero.");
        //timeLimit = 31;
        $("#answer-field").append("<h2>Timed Out!!!</h2>");
        var imageElement = $("<img src='assets/images/" + qANDa[questIndex].imageFile + "' alt='webp-hobbit' >");
        $("#answer-field").append(imageElement);
        $("#answer-field").append(breakElement);
        $("#answer-field").append(qANDa[questIndex].comment);
        $("#answer-field").append(breakElement);
        wrong++;
        clearInterval(interval);
        var timeout = setTimeout(EndOfQuestionTimer, 3 * 1000);
    };
};

var EndOfQuestionTimer = function() {
    console.log("EndOfQuestionTimer called when timeout reached.");
    questIndex++;
    $("#answer-field").empty();
    if (questIndex === qANDa.length) {
        questionElement.text("");
        //clearInterval(interval); should not need this...
        // display camp pic, and a restart button, and score.
        var imageElement = $("<img src='assets/images/campfire.webp' alt='webp-campfire' >");
        $("#answer-field").append(imageElement);
        $("#answer-field").append(breakElement);
        $("#answer-field").append("Correct: " + correct + "    ");
        $("#answer-field").append("Wrong: " + wrong + "    ");
        var button = $("<button>");
        button.addClass("button");
        button.text("Try Again");
        $("#answer-field").append(button);
    } else {
        //timeLimit = 31;
        //interval = setInterval(intervalFunction, 1000);
        writeQandA();
    };
};


var timeLimit;
$("#timer-sec").html(timeLimit);
//this one runs a function every 1000 milliseconds 
var interval;
//var foo = setInterval(bar, 1000);
var correct = 0;
var wrong = 0;


// Create and dispay the title element
var titleElement = $("<div>LOTR semi-trivial trivia!!!</div>");
// Decorate the title element
titleElement.css({
    "display": "flex",
    "justify-content": "center",
    "background-color": "orangered",
    "font-size": "300%",
    "font-family": "fantasy",
    "opacity": "0.9",
    "color": "blue"

});
//  I am placing everything relative to the timer...just because.
//  I *could* have created the container only, and placed everything
//  inside that.  I may, but I want to give an example of all the
//  insertion/addtion methods that I possibly can.
$(".timer-title").before(titleElement);


var questionElement = $("<div></div>");
questionElement.css({
    "display": "flex",
    "justify-content": "center"
});
var breakElement = $("<br>");
//var answerFieldElement = $("#answer-field");
var questIndex = 0;




var writeQandA = function() {
    // A little protection code
    console.log("questIndex: " + questIndex + "  qANDa.length: " + qANDa.length);
    if (questIndex === qANDa.length) { return; }

    timeLimit = 11;
    interval = setInterval(intervalFunction, 1000);

    questionElement.text(qANDa[questIndex].question);
    questionElement = decorateQuestion(questionElement);
    //insert questionElement AFTER the timer
    $("#timer-sec").after(breakElement, breakElement, questionElement);

    questionElement.after(breakElement, breakElement);

    var answerElement = [];
    for (idx = 0; idx < 4; idx++) {
        answerElement[idx] = $("<div></div");
        answerElement[idx].addClass("answer");
        answerElement[idx].text(qANDa[questIndex].answers[idx]);
        answerElement[idx].attr("data-index", idx);
        $("#answer-field").append(answerElement[idx]);
        answerElement[idx] = decorateAnswer(answerElement[idx]);
    };
};


function decorateQuestion(elementGiven) {
    elementGiven.css({
        "font-size": "150%",
        "color": "hotpink"
    })
    return elementGiven;
}

function decorateAnswer(elementGiven) {
    elementGiven.css({
        //"display": "flex",
        //"justify-content": "center",
        "font-size": "150%",
        "font-family": "star-trek",
        "opacity": "0.9",
        "width": "100%"

    });
    return elementGiven;
}

$(document).on("click", ".button", restart);

function restart() {
    questIndex = 0;
    $("#answer-field").empty();
    writeQandA();
    correct = 0;
    wrong = 0;
};

$(document).on("mouseenter", ".answer", setBackground);
$(document).on("mouseleave", ".answer", setBackgroundBack);

//$(".answer").hover(function() {
function setBackground() {
    $(this).css("background-color", "yellow");
}

function setBackgroundBack() {
    $(this).css("background-color", "rgb(0, 0, 0, 0)");
};

// need to do it this way, or I will lose binding somehow.  I am still a little fuzzy on that.
$(document).on("click", ".answer", answerClick);

function answerClick() {
    // the user has clicked on an answer button...
    // get the index value of the button pushed
    var buttonIdx = $(this).attr("data-index");
    // compare it to the correct answer, and if it matches
    // display all kinds of good stuff
    console.log("button idx: ", buttonIdx);
    console.log("qANDa correct value: ", qANDa[questIndex].correct);
    //var imageElement = $( < img > < /img>)
    if (parseInt(buttonIdx) === qANDa[questIndex].correct) {
        console.log("Hooray!!!");
        // clear the answer field, or will will just be adding on to it...making a mess
        $("#answer-field").empty();
        var imageElement = $("<img src='assets/images/" + qANDa[questIndex].imageFile + "' alt='webp-hobbit' >");
        $("#answer-field").append(imageElement);
        $("#answer-field").append(breakElement);
        $("#answer-field").append(qANDa[questIndex].comment);
        $("#answer-field").append(breakElement);
        $("#answer-field").append("<h2>Hooray!!!!</h2>");
        var imageElement2 = $("<img src='assets/images/clappinggif.webp' alt='webp-clapping' >");
        $("#answer-field").append(imageElement2);
        // add to the correct count, stop the silly timer (remember to restart), and
        // set a timeout so that the user can enjoy the visuals for a short time
        correct++;
        clearInterval(interval);
        var timeout = setTimeout(EndOfQuestionTimer, 3 * 1000);
    } else {
        console.log("Wrong Answer...");
        $("#answer-field").empty();
        var imageElement = $("<img src='assets/images/gollumgif.webp' alt='webp-gollum' >");
        $("#answer-field").append(imageElement);
        $("#answer-field").append(breakElement);
        $("#answer-field").append(qANDa[questIndex].comment);
        $("#answer-field").append(breakElement);
        $("#answer-field").append("<h2>Total bummer...Ok, don't be like that... </h2>");


        wrong++;
        clearInterval(interval);
        var timeout2 = setTimeout(EndOfQuestionTimer, 3 * 1000);

    }

};


// The only line of straight-up code.  Everything else is a funciton.
writeQandA();


// example code, just in case I need it
//this clears the timeout so the function is never run
//clearTimeout(timeout);