const ticTacToeBoard = document.getElementById("ticTacToeBoard")
const startGame = document.getElementById("startGame")
const btnStarGame = document.getElementById("btnStarGame")

//Executado após DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  ticTacToeBoard.style.display = "none"
});

btnStarGame.addEventListener("click", () => {
  ticTacToeBoard.style.display = "grid"
  startGame.style.display = "none"
})




