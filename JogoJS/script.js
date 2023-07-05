let colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white"];

let level = 1;
let timer = 3;
let score = 0;
let targetWord = "";
let targetColor = "";

const levelElement = document.getElementById("level");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const targetWordElement = document.getElementById("target-word");
const buttonContainer = document.getElementById("button-container");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", iniciaJogo);

function iniciaJogo() {
   level = 1;
   timer = getTimerByLevel(level);
   score = 0;
   atualizaPlacar();
   startButton.disabled = true;
   startButton.textContent = "Jogo em andamento...";
   proximoNivel();
   setTimeout(cronometro, 1000);
}

function atualizaNivel() {
   levelElement.textContent = level;
}

function atualizaPlacar() {
   scoreElement.textContent = score;
}

function cronometro() {
   if (timer > 0) {
      timer--;
      timerElement.textContent = timer;
      setTimeout(cronometro, 1000);
   } else {
      encerraJogo();
   }
}

function encerraJogo() {
   startButton.disabled = false;
   startButton.textContent = "Reiniciar";
   buttonContainer.querySelectorAll(".color-button").forEach(button => {
      button.disabled = true;
   });

   if (encerraJogo) {
      alert ("Você perdeu, reinicie!")
   }
}

function embaralhaBotoes() {
   const buttons = Array.from(buttonContainer.querySelectorAll(".color-button"));
   for (let i = buttons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttons[i].className, buttons[j].className] = [buttons[j].className, buttons[i].className];
   }
}

function defineAlvo() {
   const randomIndex = Math.floor(Math.random() * colors.length);
   targetColor = colors[randomIndex];
   targetWord = colors[Math.floor(Math.random() * colors.length)];
   targetWordElement.textContent = targetWord;
   targetWordElement.style.color = targetColor;
}

function verificaResposta(event) {
   const selectedColor = event.target.className.split(" ")[1];
   if (selectedColor === targetColor) {
      score++;
      atualizaPlacar();
      if (score % 10 === 0) {
         level++;
      }
      proximoNivel();
   } else {
      encerraJogo();
   }
}

buttonContainer.querySelectorAll(".color-button").forEach(button => {
   button.addEventListener("click", verificaResposta);
});


function proximoNivel() {
   timer = getTimerByLevel(level);
   timerElement.textContent = timer;
   defineAlvo();
   embaralhaBotoes();
   buttonContainer.querySelectorAll(".color-button").forEach(button => {
      button.disabled = false;
   });
}

function getTimerByLevel(level) {
   switch (level) {
      case 1:
         return 3;
      case 2:
         return 2;
      case 3:
         return 2;
      case 4:
         return 1.7;
      case 5:
         return 1.5;
      case 6:
         return 1;
      default:
         return 1;
   }
}