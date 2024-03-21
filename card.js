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

export default Card;
