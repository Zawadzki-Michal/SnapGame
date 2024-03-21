# @@@ Snap Game @@@

Snap Game is a simple card game where players take turns to play cards from their hand and match them with cards played by other players. The player who runs out of cards first or the one with the most cards at the end of the game wins.

# Game Logic

Players are prompted to enter the number of players (2-4), the number of decks (1-4), and the match type (faceOnly or faceAndSuit).
A new SnapGame instance is created with the provided settings.
Cards are shuffled and distributed among the players.
The game starts with each player taking turns to play a card from their hand.
If a player's card matches the card played by the previous player, they take the cards and add them to their hand.
The game continues until no players have cards left.
The player with the most cards in their hand is declared the winner.

# File Structure

deck.js: Defines the Deck class, responsible for creating and shuffling decks of cards.
player.js: Defines the Player class, representing a player in the game.
snapgame.js: Defines the SnapGame class, which manages the game logic including starting the game, playing rounds, and determining the winner.
script.js: Entry point of the application. It handles user input, creates a SnapGame instance, and starts the game.
