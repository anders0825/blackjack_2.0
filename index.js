let playerCardDisp = document.getElementById("player-cards");
let playerChipDisp = document.getElementById("player-chips");
let dealerCardDisp = document.getElementById("dealer-cards");
let messageEl = document.getElementById("message-el");

let playerCards = [];
let playerSum = 0;
let dealerCards = [];
let dealerSum = 0;
let playerChips = 200;
let isAlive = false;
let message = "Hey Kid, $20 per round. Want to play?";

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function render() {
  messageEl.textContent = message;
  playerCardDisp.textContent = playerCards;
  dealerCardDisp.textContent = dealerCards;
  playerChipDisp.textContent = "Chips: " + playerChips + "$";
  console.log(playerSum);
  console.log(dealerSum);
}

function newGame() {
  playerChips -= 20;
  isAlive = true;
  playerCards = "...";
  playerSum = 0;
  dealerCards = "...";
  dealerSum = 0;
  playerCards = [getRandomCard(), getRandomCard()];

  for (let i in playerCards) {
    playerSum += playerCards[i];
  }

  if (playerSum > 21) {
    message = "Bad Luck kid. he he he ";
    lose();
  } else if (playerSum === 21) {
    win();
    message = "U got Blackjack already? Wtf...?";
  } else {
    message = playerSum + ", HIT or STAND?";
  }

  render();
}

function hit() {
  if (isAlive === true) {
    let card = getRandomCard();
    playerCards.push(card);
    playerSum += card;

    if (playerSum < 21) {
      message = playerSum + " ...OK, HIT or STAND Kid?";
    } else if (playerSum > 21) {
      lose();
      message = playerSum + " BUST! ...wanna play again?";
    } else {
      win();
      message = playerSum + " grrrr... Lucky, wanna play again?";
    }
    render();
  }
}

function stand() {
  if (isAlive === true) {
    dealerCards = [getRandomCard(), getRandomCard()];

    for (let i in dealerCards) {
      dealerSum += dealerCards[i];
    }

    while (dealerSum < playerSum) {
      let card = getRandomCard();
      dealerSum += card;
      dealerCards.push(card);
    }

    if (dealerSum > playerSum && dealerSum <= 21) {
      lose();
      message = dealerSum + ", u lose... wanna play again?";
    }

    if (dealerSum === playerSum) {
      message = dealerSum + ", Equal huh... wanna play again?";
      isAlive = false;
      playerChips += 20;
    }

    if (dealerSum > 21) {
      win();
      message = dealerSum + ", FUCK!... wanna play again?";
    }

    render();
  }
}

function win() {
  isAlive = false;
  playerChips += 40;
  render();
}

function lose() {
  isAlive = false;
  render();
}
