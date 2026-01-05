const colors = ["red", "green", "yellow", "orange"]; 

let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

// START GAME
document.addEventListener("keydown", startGame)
document.querySelector("#level-title").addEventListener("click", startGame)
function startGame(){
  if (!started) {
    nextSequence();
    started = true;
    document.querySelector("#level-title").textContent = "";
  }
}
  

// USER CLICK
function userclick() {
  for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    let btn = document.querySelectorAll(".btn")[i];
    btn.addEventListener("click", function () {
      const clickedBtn = this.id;
      userPattern.push(clickedBtn);
      animateBox(userPattern[userPattern.length - 1])
      checkAnswer();
    });
  }
}

userclick();

//next sequence
function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  gamePattern.push(randomColor);

  // Play sequence with delays
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      playsound(gamePattern[i]);
    }, i * 1000);
  }
}

// sound logic
function playsound(color) {
  let audio = new Audio(`./audio/${color}.mp3`);
  audio.play();
  animateBox(color);
}

// check answer logic
function checkAnswer() {
  const currentIndex = userPattern.length - 1;
  if (gamePattern[currentIndex] === userPattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 2000);
    }
  } else {
    wrong();
  }
}


function wrong() {
  const paimon = new Audio("./audio/paimon.mp3");
  paimon.play();
   const  text = document.getElementById("level-title")
   text.textContent = "Game Over nigga, Press Any Key to Restart or click me";
   text.classList.add("game-text")
  started = false;
  level = 0;
  gamePattern = [];
  userPattern = [];
}

// animation logic
function animateBox(color) {
  const btn = document.getElementById(color);
  if (!btn) return;
  btn.classList.add("animation");
  setTimeout(() => btn.classList.remove("animation"), 300);
}
