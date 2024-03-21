const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];


/*
** Deck Class:
- Constructor: Initializes a new deck with a specified number of decks (default is 1).
- shuffleCards(): Shuffles the cards in the deck.
- dealCard(): Deals a card from the deck. If the deck is empty, it throws an error.
*/

export default class Deck {
  constructor(numDecks = 1) {
    this.cards = freshDeck(numDecks);
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  dealCard() {
    if (this.cards.length === 0) {
      throw new Error("No cards left in the deck.");
    }
    return this.cards.pop();
  }
}

function freshDeck(numDecks) {
  const decks = [];
  for (let i = 0; i < numDecks; i++) {
    decks.push(
      ...suits.flatMap((suit) => {
        return values.map((value) => {
          return new Card(suit, value);
        });
      })
    );
  }
  return decks;
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
  isEqual(otherCard) {
    return this.value === otherCard.value;
}


  getName() {
    return `${this.value} of ${this.suit}`;
  }

  matches(otherCard, matchType) {
    if (!["faceOnly", "faceAndSuit"].includes(matchType)) {
      throw new Error("Invalid match type provided.");
    }
    if (matchType === "faceOnly") {
      return this.value === otherCard.value;
    } else if (matchType === "faceAndSuit") {
      return this.value === otherCard.value && this.suit === otherCard.suit;
    } else {
      throw new Error("Invalid match type provided.");
    }
  }
}
