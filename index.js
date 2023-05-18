//Blocos
const ticTacToeBoard = document.getElementById("ticTacToeBoard")
const scoreBoardInputs = document.getElementById("scoreBoardInputs")
const startGame = document.getElementById("startGame")

//Botões
const btnStartGame = document.getElementById("btnStartGame")
const btnFinishGame = document.getElementById("btnFinishGame")
const btnContinueGame = document.getElementById("btnContinueGame")

//Inputs
const scorePlayerOne = document.getElementById("scorePlayerOne")
const scorePlayerTwo = document.getElementById("scorePlayerTwo")
const whoIsFirst = document.getElementById("whoIsFirst")
const whoIsNext = document.getElementById("whoIsNext")
const playerOne = document.getElementById("playerOne")
const playerTwo = document.getElementById("playerTwo")
const gameMessages = document.getElementById("gameMessages")

const boardItem0 = document.getElementById("boardItem0")
const boardItem1 = document.getElementById("boardItem1")
const boardItem2 = document.getElementById("boardItem2")
const boardItem3 = document.getElementById("boardItem3")
const boardItem4 = document.getElementById("boardItem4")
const boardItem5 = document.getElementById("boardItem5")
const boardItem6 = document.getElementById("boardItem6")
const boardItem7 = document.getElementById("boardItem7")
const boardItem8 = document.getElementById("boardItem8")

function continueGame() {
  btnContinueGame.style.visibility = "hidden"
  //Alternar a vez por partida
  if (whoIsFirst.value === "playerOne") {
    whoIsFirst.value = "playerTwo"
    whoIsNext.value = "playerTwo"
  } else {
    whoIsFirst.value = "playerOne"
    whoIsNext.value = "playerOne"
  }
  prepareGame()
}

function winnerCommands(firstItem, secondItem, thirdItem) {
  removeAllClicksFromTheBoard()
  removeAllPointers()

  btnContinueGame.style.visibility = "visible"
  btnContinueGame.addEventListener("click", continueGame)

  const winner = whoIsNext.value === "playerOne" ? playerTwo : playerOne
  gameMessages.value = `${winner.value} venceu essa rodada!`

  if (whoIsNext.value === "playerOne") {
    gameMessages.value = `${playerTwo.value} venceu essa rodada!`
    scorePlayerTwo.value = parseInt(scorePlayerTwo.value) + 1
  } else {
    gameMessages.value = `${playerOne.value} venceu essa rodada!`
    scorePlayerOne.value = parseInt(scorePlayerOne.value) + 1
  }

  //Implementar o CSS para mudar as cores

}

//Verifica se naquela linha os simbolos estão iguais
function checkLine(firstItem, secondItem, thirdItem) {
  value1 = firstItem.dataset.value;
  value2 = secondItem.dataset.value;
  value3 = thirdItem.dataset.value;

  if (value1 === value2 && value2 === value3) {
      return true;
  } else {
      return false;
  }
}

function checkWinner() {
    //Linha diagonal (0 = 4 = 8)
  if (checkLine(boardItem0, boardItem4, boardItem8)) {
    winnerCommands(boardItem0, boardItem4, boardItem8)
    return true
  } 
  //Linha diagonal (2 = 4 = 6)
  if (checkLine(boardItem2, boardItem4, boardItem6)) {
    winnerCommands(boardItem2, boardItem4, boardItem6)
    return true
  }

  //Linha horizontal (0 = 1 = 2)
  if (checkLine(boardItem0, boardItem1, boardItem2)) {
    winnerCommands(boardItem0, boardItem1, boardItem2)
    return true
  }
  //Linha horizontal (3 = 4 = 5)
  if (checkLine(boardItem3, boardItem4, boardItem5)) {
    winnerCommands(boardItem3, boardItem4, boardItem5)
    return true
  }
  //Linha horizontal (6 = 7 = 8)
  if (checkLine(boardItem6, boardItem7,boardItem8)) {
    winnerCommands(boardItem6, boardItem7, boardItem8)
    return true
  }  

  //Linha vertical (0 = 3 = 6)
  if (checkLine(boardItem0, boardItem3,boardItem6)) {
    winnerCommands(boardItem0, boardItem3, boardItem6)
    return true
  } 
  //Linha vertical (1 = 4 = 7)
  if (checkLine(boardItem1, boardItem4,boardItem7)) {
    winnerCommands(boardItem1, boardItem4, boardItem7)
    return true
  } 
  //Linha vertical (2 = 5 = 8)
  if (checkLine(boardItem2, boardItem5,boardItem8)) {
    winnerCommands(boardItem2, boardItem5, boardItem8)
    return true
  }        

  return false
}

function howMuchPointers() {
  let countPointers = 0;
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i)
    if (currentItem.classList.contains("pointer")) {
      countPointers++
    }      
  }
  return countPointers
}

function showDrawMsg() {
  gameMessages.value = `Deu empate!`

  btnContinueGame.style.visibility = "visible"
  btnContinueGame.addEventListener("click", continueGame)
}

//Mostrar msg para próximo a jogar
function showMsgNextPlayer() {
  const idPlayer = whoIsNext.value
  const nickPlayer = document.getElementById(idPlayer).value
  gameMessages.value = `Jogue ${nickPlayer}!`
}

function writeOnTheBoard(currentBoardItem) {
  //Marca o simbolo no tabuleiro
  const idPlayer = whoIsNext.value
  const playerSimbol = document.getElementById(idPlayer).dataset.simbol
  currentBoardItem.value = playerSimbol  
  currentBoardItem.dataset.value = playerSimbol 

  //Adiciona classe(css) dá cor do jogador (X ou O) p/ msg e para a marcação
  
  //Alterna o jogador
  if (whoIsNext.value === "playerOne") {
    whoIsNext.value = "playerTwo"
  } else {
    whoIsNext.value = "playerOne"
  }
}

function playerPlaying(ev) {
  const currentBoardItem = ev.currentTarget

  writeOnTheBoard(currentBoardItem)

  //Remove click e pointer(class) do tabuleiro
  currentBoardItem.removeEventListener("click", playerPlaying)
  currentBoardItem.classList.remove("pointer")

  //Verifica se tem ganhador
  const anyoneWin = checkWinner()

  if (anyoneWin === false) {
    //Lógica para verificar se há empate no jogo
    howMuchPointers() > 0 ? showMsgNextPlayer() : showDrawMsg()
  }
}

function removeAllPointers() {
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i)
    currentItem.classList.remove("pointer")     
  }  
}

function addAllPointers() {
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i)
    currentItem.classList.add("pointer")     
  }  
}

function removeAllClicksFromTheBoard() {
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i)
    currentItem.removeEventListener("click", playerPlaying)      
  }
}

function addAllClicksFromTheBoard() {
  for (let i = 0; i <= 8; i++) {
    let currentItem = document.getElementById("boardItem" + i)
    currentItem.addEventListener("click", playerPlaying)     
  }  
}

function resetBoard() {
  //Remove todas a classe css relativa a win

  //Habilita todos os campos do tabuleiro
  addAllClicksFromTheBoard()

  //Adiciona em todos os campos pointer(classe)
  addAllPointers()

  //Limpa todos as jogadas (setar para os valores originais, ABC)
  boardItem0.value = ""
  boardItem0.dataset.value = "A"
  boardItem1.value = ""
  boardItem1.dataset.value = "B"
  boardItem2.value = ""
  boardItem2.dataset.value = "A"
  boardItem3.value = ""
  boardItem3.dataset.value = "B"
  boardItem4.value = ""
  boardItem4.dataset.value = "C"
  boardItem5.value = ""
  boardItem5.dataset.value = "B"
  boardItem6.value = ""
  boardItem6.dataset.value = "A"
  boardItem7.value = ""
  boardItem7.dataset.value = "B"
  boardItem8.value = ""
  boardItem8.dataset.value = "A"
}

//Mostra Tabuleiro e Placar / Esconde tela de Start game
function screenChanges() {
    ticTacToeBoard.style.display = "grid"
    scoreBoardInputs.style.visibility = "visible"
    startGame.style.display = "none"  
}

function prepareGame() {
  showMsgNextPlayer()

  //Se não for a primeira vez...
  scorePlayerOne.value !== "0" || scorePlayerTwo.value !== "0" ? resetBoard() : screenChanges()

  //Adiciona o evento click em todos os campos do tabuleiro e a função "playerPlaying"
  addAllClicksFromTheBoard()
}

btnStartGame.addEventListener("click", () => {
  if (playerOne.value === "" || playerTwo.value === "") {
    alert("Preencha os campos com os nicks dos jogadores! ")
  } else {
    prepareGame()
  }
})

//Recarrega o jogo para novos jogadores
btnFinishGame.addEventListener("click", () => location.reload())

//Executado após DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  ticTacToeBoard.style.display = "none"
  scoreBoardInputs.style.visibility = "hidden"
  btnContinueGame.style.visibility = "hidden"
})




