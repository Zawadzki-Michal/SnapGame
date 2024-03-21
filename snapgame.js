import Deck from "./deck.js";
import Player from "./player.js";

class SnapGame {
  constructor(numPlayers, numDecks, matchType, numRounds) {
    this.numPlayers = numPlayers;
    this.numDecks = numDecks;
    this.matchType = matchType;
    this.numRounds = numRounds;
    this.scores = new Array(numPlayers).fill(0);
    this.round = 0;
  }

  startGame() {
    const deck = new Deck(this.numDecks);
    deck.shuffleCards();

    const players = [];
    for (let i = 0; i < this.numPlayers; i++) {
      const player = new Player(`Player ${i + 1}`);
      players.push(player);
    }

    let currentPlayerIndex = 0;
    while (deck.cards.length > 0 && currentPlayerIndex < this.numPlayers) {
      for (
        let j = 0;
        j < Math.floor(deck.cards.length / this.numPlayers);
        j++
      ) {
        players[currentPlayerIndex].addCardToHand(deck.dealCard());
        currentPlayerIndex = (currentPlayerIndex + 1) % this.numPlayers;
      }

      if (deck.cards.length > 0) {
        const remainingPlayer = players[currentPlayerIndex];
        remainingPlayer.addCardToHand(deck.dealCard());
      }

      currentPlayerIndex = (currentPlayerIndex + 1) % this.numPlayers;
    }

    console.log("\nInitial hands:");
    players.forEach((player) => {
      console.log(
        `${player.getName()}'s hand:`,
        player.hand.map((card) => card.getName())
      );
    });

    this.playRound(players);
  }

  playRound(players) {
    this.round++;

    const snapButton = document.createElement("button");
    snapButton.textContent = "SNAP";
    snapButton.addEventListener("click", () => {
      this.handleSnap(players);
      this.nextRound(players);
    });

    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.addEventListener("click", () => {
      this.nextRound(players);
    });

    const promptWindow = document.createElement("div");
    promptWindow.textContent = "Press SNAP if you see a match!";
    promptWindow.appendChild(snapButton);
    promptWindow.appendChild(continueButton);
    document.body.appendChild(promptWindow);

    console.log(`\nRound ${this.round}`);

    players.forEach((player) => {
      console.log(`\nPlayer turn: ${player.getName()}`);
      player.playTurn();
    });

    players.forEach((player, index) => {
      const score = player.getHandSize();
      this.scores[index] += score;
    });
  }

  nextRound(players) {
    const promptWindow = document.querySelector("div");
    document.body.removeChild(promptWindow);

    if (this.round < this.numRounds) {
      this.playRound(players);
    } else {
      this.endGame();
    }
  }

  handleSnap(players) {
    const currentPlayerIndex = (this.round - 1) % this.numPlayers;
    const previousPlayerIndex =
      (currentPlayerIndex + this.numPlayers - 1) % this.numPlayers;

    const currentPlayer = players[currentPlayerIndex];
    const previousPlayer = players[previousPlayerIndex];

    const currentCard = currentPlayer.getLastPlayedCard();
    const previousCard = previousPlayer.getLastPlayedCard();

    if (currentCard && previousCard && this.cardsMatch(currentCard, previousCard)) {
      console.log(`SNAP! ${currentPlayer.getName()} wins both piles!`);
      currentPlayer.addToPile(previousPlayer.getPile());
    } else {
      console.log("No snap!");
    }
}

cardsMatch(card1, card2) {
    if (this.matchType === "faceOnly") {
      return card1.value === card2.value;
    } else if (this.matchType === "faceAndSuit") {
      return card1.value === card2.value && card1.suit === card2.suit;
    } else {
      throw new Error("Invalid match type provided.");
    }
  }

  endGame() {
    console.log("\nNo players have cards left. Game over!");

    const maxScore = Math.max(...this.scores);
    const winningPlayers = this.scores
      .map((score, index) => (score === maxScore ? index + 1 : -1))
      .filter((index) => index !== -1)
      .map((index) => `Player ${index}`);

    console.log(
      `${winningPlayers.join(" and ")} win(s) the game with ${maxScore} points!`
    );
  }
}

export default SnapGame;
