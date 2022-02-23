var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPickedPattern = [];
var level = 1;
var started = false;

// general function for playing sound
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//function for fading color
function fadeColor(name) {
  $("#" + name).fadeOut(200).fadeIn(200);
}

//function to play next game level
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  userPickedPattern = [];
  gamePattern.push(randomChosenColor);
  for (i = 0; i < gamePattern.length; i++) {
    (function(i) {

      window.setTimeout(function() {
        playSound(gamePattern[i]);
        fadeColor(gamePattern[i]);
      }, i * 400);

    }(i))
  }

  $("h1").text("Level " + level);
  level++
}

//function for when a button is clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userPickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log((gamePattern.slice(0, userPickedPattern.length)).toString());
  console.log(userPickedPattern.toString());
  checkAnswer();

});

function gameOver() {
  playSound("wrong");
  $("h1").text("You made it to level " + level + ". Press Any Key to Restart")
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  gamePattern = [];
  level = 1

}

//animation for when button is clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

//makes game start from any key click
$(document).keypress(function() {
  nextSequence();
});

$("h1").click(function() {
  nextSequence();
});


//checks userchosenpattern against gamePattern
function checkAnswer() {

  if ((userPickedPattern.toString() === (gamePattern.slice(0, userPickedPattern.length)).toString()) &&
    userPickedPattern.length === gamePattern.length) {
    return (function() {

      window.setTimeout(function() {
        nextSequence()
      }, 1000);

    }(i))
  } else if (userPickedPattern.toString() === (gamePattern.slice(0, userPickedPattern.length)).toString()) {
    return console.log("success");
  } else {
    return gameOver();
  }

}
