import { Deck } from "./deck.js";
import Player from "./player.js";

class SnapGame {
  constructor(numPlayers, numDecks, matchType, numRounds) {
    this.numPlayers = numPlayers;
    this.numDecks = numDecks;
    this.matchType = matchType;
    this.numRounds = numRounds;
    this.players = [];
    this.tableCards = [];
    this.round = 0;
    this.scores = new Array(this.numPlayers).fill(0);
  }

  startGame() {
    // Create and shuffle deck
    const deck = new Deck(this.numDecks);
    deck.shuffleCards();

    // Create players
    for (let i = 0; i < this.numPlayers; i++) {
      const player = new Player(`Player ${i + 1}`);
      this.players.push(player);
    }

    // Deal cards to players and remaining cards to the table
    this.tableCards = deck.dealToPlayers(this.players);

    // Start playing rounds
    this.playRound();
  }

  playRound() {
    this.round++;

    const snapButton = document.createElement("button");
    snapButton.textContent = "SNAP";
    snapButton.addEventListener("click", () => {
      this.handleSnap();
      this.nextRound();
    });

    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.addEventListener("click", () => {
      this.nextRound();
    });

    const promptWindow = document.createElement("div");
    promptWindow.textContent = "Press SNAP if you see a match!";
    promptWindow.appendChild(snapButton);
    promptWindow.appendChild(continueButton);
    document.body.appendChild(promptWindow);

    console.log(`\nRound ${this.round}`);

    this.players.forEach((player) => {
      console.log(`\nPlayer turn: ${player.getName()}`);
      player.playTurn(this.tableCards[this.tableCards.length - 1]); // Pass the table card to the player's playTurn method
    });

    this.handleSnap(); // Check for snap after all players have played their turn
    this.tableCards = []; // Reset table cards for the next round
  }

  handleSnap() {
    const lastPlayedCard = this.tableCards[this.tableCards.length - 1];
    const previousCard = this.tableCards[this.tableCards.length - 2]; // Get the previous card

    if (previousCard) {
      // Check if previousCard exists
      const snapPlayers = this.players.filter((player) =>
        player
          .getLastPlayedCard()
          ?.matches(lastPlayedCard, previousCard, this.matchType)
      );

      if (snapPlayers.length > 1) {
        const snapPlayer = snapPlayers[snapPlayers.length - 1];
        console.log(
          `SNAP! ${snapPlayer.getName()} wins the round and takes the cards.`
        );
        snapPlayers.forEach((player) => {
          snapPlayer.collectPile(player.getPile());
        });
      }
    }
  }
  nextRound() {
    const promptWindow = document.querySelector("div");
    document.body.removeChild(promptWindow);

    if (this.round < this.numRounds) {
      this.playRound();
    } else {
      this.endGame();
    }
  }

  endGame() {
    console.log("\nGame over!");

    // Calculate scores
    const scores = this.players.map((player) => player.getHandSize());
    const maxScore = Math.max(...scores);

    // Determine winners
    const winners = this.players.filter(
      (player, index) => scores[index] === maxScore
    );

    // Display winner(s)
    if (winners.length === 1) {
      console.log(
        `${winners[0].getName()} wins the game with ${maxScore} cards!`
      );
    } else {
      console.log("It's a tie!");
    }
  }
}

export default SnapGame;
