const colors = ["red", "green", "yellow", "orange"];

let gamePattern = [];
let userPattern = [];
let level = 0;
let sequence = 0;
let started = false;
let listenersAdded = false;

// START GAME
document.addEventListener("click", (event) => {
  if (started) {
    return;
  }

  if (
    event.target.id === "startButton" ||
    event.target.id === "playAgainButton"
  ) {
    if (!started) {
      started = true;
      level = 0;
      gamePattern = [];
      userPattern = [];
      nextSequence();
      userclick();
      document.getElementById("paimon-overlay").classList.add("paimon-hidden");
    }
  }

  /* if(event.tareget.classList.contains("box")){
    let talkPaimon = new Audio("#")
    const text = document.querySelector(".text")
    const colorCliked = event.target.id
    text.textContent = "paimon heard you click a colour" + colorCliked
            
  } */
});

// USER CLICK
function userclick() {
  if (listenersAdded) return;
  listenersAdded = true;
  for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    let btn = document.querySelectorAll(".btn")[i];
    btn.addEventListener("click", function () {
      if (!started) return;
      const clickedBtn = this.id;
      userPattern.push(clickedBtn);
      playsound(clickedBtn);
      animateBox(userPattern[userPattern.length - 1]);
      checkAnswer();
    });
  }
}

//next sequence
function nextSequence() {
  userPattern = [];
  level++;
  sequence++;
  document.getElementById("Level").textContent = "Level " + level;
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  gamePattern.push(randomColor);

  // Play sequence with delays
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      playsound(gamePattern[i]);
    }, i * 600);
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
  const text = document.querySelector("#Level");
  text.textContent = "Game Over";
  started = false;
  level = 0;
  gamePattern = [];
  userPattern = [];
  document.getElementById("paimon-overlay").classList.remove("paimon-hidden");
}

// animation logic
function animateBox(color) {
  const btn = document.getElementById(color);
  if (!btn) return;
  btn.classList.add("animation");
  setTimeout(() => btn.classList.remove("animation"), 300);
}

const closeButton = document.querySelector("#closeButton");
closeButton.addEventListener("click", () => {
  document.getElementById("paimon-overlay").classList.add("paimon-hidden");
});
