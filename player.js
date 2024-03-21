// Purpose: Player class to represent a player in the game
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.pile = [];
  }

// Function to get the name of the player
  getName() {
    return this.name;
  }

// Function to add a card to the player's hand
  addCardToHand(card) {
    this.hand.push(card);
  }

// Function to play a turn
  playTurn() {
    const playedCard = this.hand.pop();
    if (playedCard) {
      console.log(`${this.name} plays ${playedCard.getName()}.`);
      this.addToPile(playedCard);
    } else {
      console.log(`${this.name} has no cards left to play.`);
    }
  }
// Function to check if the player has any cards left
  addToPile(card) {
    this.pile.push(card);
  }
// Function to check if the player has any cards left
    getHandSize() {
      return this.hand.length;
  }

// Function to check if the player has any cards left
  getLastPlayedCard() {
    if (this.pile.length > 0) {
      return this.pile[this.pile.length - 1];
    }
    return null;
  }

  collectPile(cards) {
    this.pile.push(...cards);
  }

  getPile() {
    return this.pile;
  }

  // Function to receive cards from the deck
  receiveCard(card) {
    this.hand.push(card);
  }
}

export default Player;