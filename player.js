class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.pile = [];
  }

  getName() {
    return this.name;
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  playTurn() {
    const playedCard = this.hand.pop();
    if (playedCard) {
      console.log(`${this.name} plays ${playedCard.getName()}.`);
      this.addToPile(playedCard);
    } else {
      console.log(`${this.name} has no cards left to play.`);
    }
  }

  addToPile(card) {
    this.pile.push(card);
  }

  getHandSize() {
    return this.hand.length;
  }

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