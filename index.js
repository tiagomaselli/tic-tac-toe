//Blocos
const ticTacToeBoard = document.getElementById("ticTacToeBoard")
const startGame = document.getElementById("startGame")

//Botões
const btnStarGame = document.getElementById("btnStarGame")
const btnFinishGame = document.getElementById("btnFinishGame")

//Inputs
const scorePlayerOne = document.getElementById("scorePlayerOne")
const scorePlayerTwo = document.getElementById("scorePlayerTwo")
const whoIsFirst = document.getElementById("whoIsFirst")
const playerOne = document.getElementById("playerOne")
const playerTwo = document.getElementById("playerTwo")
const gameMessages = document.getElementById("gameMessages")

function playerPlaying() {
  alert("cliquei em um elemento")
}

function removeAllClicksFromTheBoard() {
  for (let i = 0; i <= 8; i++) {
     let currentItem = document.getElementById("boardItem" + i);
     currentItem.removeEventListener("click", playerPlaying);      
  }
}

function addAllClicksFromTheBoard() {
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i);
    currentItem.addEventListener("click", playerPlaying);      
  }  
}

function prepareGame() {
  //Mostrar Placar

  //Mostra o nome do jogador que vai começar jogando
  const idPlayer = whoIsFirst.value
  const nickPlayer = document.getElementById(idPlayer).value
  gameMessages.value = `Jogue ${nickPlayer}!`

  //Remove todas a classe css relativa a win
  //Limpa todos as jogadas (setar para os valores originais, ABC)
  //Habilita todos os campos do tabuleiro  
  //Adiciona em todos os campos pointer (adicionar classe)

  //Adiciona o evento click em todos os campos do tabuleiro e a função "playerPlaying"
  addAllClicksFromTheBoard()
}

btnStarGame.addEventListener("click", () => {
  if (playerOne.value === "" || playerTwo.value === "") {
    alert("Preencha os campos com os nicks dos jogadores! ")
  } else {
    ticTacToeBoard.style.display = "grid"
    startGame.style.display = "none"
    prepareGame()
  }
})

//Recarrega o jogo para novos jogadores
btnFinishGame.addEventListener("click", () => location.reload())

//Executado após DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  ticTacToeBoard.style.display = "none"
})




