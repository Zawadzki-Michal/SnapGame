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

// Class to represent a deck of cards
class Deck {
  constructor(numDecks = 1) {
    this.cards = freshDeck(numDecks);
  }

  // Function to shuffle the deck
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
  // Function to deal a card from the deck
  dealCard() {
    if (this.cards.length === 0) {
      throw new Error("No cards left in the deck.");
    }
    return this.cards.pop();
  }

  // Function to distribute cards between players and place remaining cards on the table
  dealToPlayers(players) {
    const numPlayers = players.length;
    const numCardsPerPlayer = Math.floor(this.cards.length / numPlayers);
    const remainingCards = this.cards.length % numPlayers;

    for (let i = 0; i < numPlayers; i++) {
      for (let j = 0; j < numCardsPerPlayer; j++) {
        players[i].receiveCard(this.dealCard());
      }
    }

    // Place remaining cards on the table
    const tableCards = [];
    for (let i = 0; i < remainingCards; i++) {
      tableCards.push(this.dealCard());
    }

    return tableCards;
  }
}

// Function to create a fresh deck of cards
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

// Class to represent a card
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  // Function to check if two cards are equal
  isEqual(otherCard) {
    return this.value === otherCard.value;
  }

  // Function to get the name of the card
  getName() {
    return `${this.value} of ${this.suit}`;
  }

  // Function to check if the current card matches the previous two cards
  matches(otherCard, previousCard, matchType) {
    matchType = matchType.toLowerCase(); // Convert matchType to lowercase for case insensitivity
    if (!["faceonly", "faceandsuit"].includes(matchType)) {
      throw new Error(
        "Invalid match type provided. Please enter 'faceOnly' or 'faceAndSuit'."
      );
    }
    if (matchType === "faceonly") {
      return (
        this.value === otherCard.value && this.value === previousCard.value
      );
    } else if (matchType === "faceandsuit") {
      return (
        this.value === otherCard.value &&
        this.value === previousCard.value &&
        this.suit === otherCard.suit &&
        this.suit === previousCard.suit
      );
    }
  }
}

export { Deck, Card };
