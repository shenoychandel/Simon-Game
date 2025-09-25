var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started=false;

var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkanswer(userClickedPattern.length-1);

});

function checkanswer(currentlevel){
    if( gamePattern[currentlevel]===userClickedPattern[currentlevel]){
     console.log("success");
 
     if(gamePattern.length===userClickedPattern.length){
         setTimeout(function(){
             nextSequence();
         },1000);
     }
    }
    else{
     console.log("wrong");
     playSound("wrong");
     $("body").addClass("game-over");

     setTimeout(function(){
        $("body").removeClass("game-over");
     },200);

     $("h1").text("game over,Press any key to restart");

     startover();
    }
 }

function nextSequence() {
       
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startover(){
   level=0;
   started=false;
   gamePattern=[];
}
