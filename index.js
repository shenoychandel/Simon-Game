console.log("JavaScript loaded successfully!"); // Debug line

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

// Debug: Check if buttons exist
console.log("Number of buttons found: " + $(".btn").length);

$(document).keydown(function(){
    console.log("Key pressed - started: " + started); // Debug
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    console.log("Button clicked: " + $(this).attr("id")); // Debug
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    console.log("Checking answer..."); // Debug
    console.log("Game pattern: " + gamePattern);
    console.log("User pattern: " + userClickedPattern);
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    console.log("Next sequence - Level: " + level); // Debug
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    console.log("Next color: " + randomChosenColor); // Debug
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    console.log("Playing sound: " + name); // Debug
    // var audio = new Audio("sounds/" + name + ".mp3");
    // audio.play().catch(e => console.log("Audio error: " + e)); // Commented out for now
}

function animatePress(currentColor) {
    console.log("Animating: " + currentColor); // Debug
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    console.log("Game over - restarting"); // Debug
    level = 0;
    started = false;
    gamePattern = [];
}

// Initial debug info
console.log("Script initialization complete");