let player = {
    name: "Auke",
    chips: 100,
    bet: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let startedGame = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")

let dealerCards = []
let dealerSum = 0
let dealerSumEl = document.getElementById("dealersum-el")
let dealerCardsEl = document.getElementById("dealercards-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function startGame() {
    if (player.chips > 0 || player.bet > 0 && isAlive === false || hasBlackJack === true) {
        isAlive = true
        hasBlackJack = false
        startedGame = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        playerEl.textContent = player.name + ": $" + player.chips
        
        // Dealer
        let firstCardDealer = getRandomCard()
        // removed second card dealer
        dealerCards = [firstCardDealer]
        dealerSum = firstCardDealer
        dealerSumEl.textContent = dealerSum
 
        // Game Start
        renderGame()
        renderDealerGame()
    }
}

// Betting
function bet1() {
    if (startedGame === false) {
        player.bet++
        player.chips--
        betEl.textContent = "Your Bet: $" + player.bet
        playerEl.textContent = player.name + ": $" + player.chips
    }
}

function bet5() {
    if (startedGame === false) {
        player.bet += 5 
        player.chips += -5
        betEl.textContent = "Your Bet: $" + player.bet
        playerEl.textContent = player.name + ": $" + player.chips
    }
}

function bet10() {
    if (startedGame === false) {
        player.bet += 10
        player.chips += -10
        betEl.textContent = "Your Bet: $" + player.bet
        playerEl.textContent = player.name + ": $" + player.chips
    }
}

function resetBet() {
    if (startedGame === false) {
        player.chips += player.bet
        player.bet = 0
        betEl.textContent = "Your Bet: $" + player.bet
        playerEl.textContent = player.name + ": $" + player.chips
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) { //BlackJack
        message = "You've got Blackjack!"
        hasBlackJack = true
        checkWinner()
        player.chips += (player.bet * 2.5)
        player.chips = player.chips - player.bet
        playerEl.textContent = player.name + ": $" + player.chips
        betEl.textContent = "Your Bet: $" + player.bet
    } else {
        message = "You've lost $" + player.bet
        player.chips = player.chips - player.bet
        playerEl.textContent = player.name + ": $" + player.chips
        betEl.textContent = "Your Bet: $" + player.bet 
        isAlive = false
        startedGame = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}





// Dealer Cards
function stopGame() {
    if (isAlive === true || hasBlackJack === true) {
        let playerScore = sum
        isAlive = false
        dealerLoop()
    }
}

function renderDealerGame() {
    dealerCardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
}

function newDealerCard() {
        let dealerCard = getRandomCard()
        dealerSum += dealerCard
        dealerCards.push(dealerCard)
        renderDealerGame() 
}

function dealerLoop() {
    newDealerCard()
    checkWinner()
    while (dealerSum < 17) {
    newDealerCard();
    checkWinner()
    }
}

function checkWinner() {
    if (dealerSum > 16) {
        if (dealerSum < sum || dealerSum > 21) {
        let playerWon = true
        player.chips += (player.bet * 2)
        message = "You've won $" + player.bet
        player.chips = player.chips - player.bet
        playerEl.textContent = player.name + ": $" + player.chips
        betEl.textContent = "Your Bet: $" + player.bet
        } else {
        let playerWon = false
        message = "You've lost $" + player.bet
        player.chips = player.chips - player.bet
        betEl.textContent = "Your Bet: $" + player.bet
        playerEl.textContent = player.name + ": $" + player.chips
            }
        }
    messageEl.textContent = message
    startedGame = false
}


