import SnapGame from "./snapgame.js";

// Function to start the game
function startGame() {
  // Get user input for number of rounds
  let numRounds = parseInt(prompt("Enter number of rounds: "));
  if (isNaN(numRounds) || numRounds < 1) {
    console.error("Invalid number of rounds. Please enter a positive integer.");
    return;
  }

  // Get user input for number of players
  let numPlayers = parseInt(prompt("Enter number of players (2-4): "));
  if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 4) {
    console.error(
      "Invalid number of players. Please enter a number between 2 and 4."
    );
    return;
  }

  // Get user input for number of decks
  let numDecks = parseInt(prompt("Enter number of decks (1-4): "));
  if (isNaN(numDecks) || numDecks < 1 || numDecks > 4) {
    console.error(
      "Invalid number of decks. Please enter a number between 1 and 4."
    );
    return;
  }

  // Get user input for match type
  let matchType;
  while (true) {
    matchType = prompt("Enter match type (faceOnly or faceAndSuit): ").toLowerCase();
    if (matchType === "faceonly" || matchType === "faceandsuit") {
      break; // Exit the loop if valid input is entered
    } else {
      console.error("Invalid match type. Please enter 'faceOnly' or 'faceAndSuit'.");
    }
  }

  // Create a new SnapGame instance with user-defined parameters
  const snapGame = new SnapGame(numPlayers, numDecks, matchType, numRounds);
  snapGame.startGame(); // Start the game
}

// Start the game when the page loads
startGame();
