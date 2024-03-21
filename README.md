Snap Game Readme

Introduction

Welcome to the Snap Game! This game is a simple implementation of the classic card game "Snap" using vanilla JavaScript. The goal of this readme is to provide an overview of the project, explain the implementation approach, and reflect on the development process.

Project Overview

The Snap Game project consists of several JavaScript files and an HTML file:

snapgame.js: Contains the main logic for the Snap Game, including initializing the game, handling rounds, and determining winners.
deck.js: Defines the Deck class responsible for creating and managing the deck of cards used in the game.
player.js: Defines the Player class, representing the players in the game and their actions.
script.js: Entry point of the application, responsible for starting the game.
Implementation Approach

Game Initialization
The game starts by prompting the user for the number of rounds, players, decks, and match type (faceOnly or faceAndSuit). This information is used to create an instance of the SnapGame class with the specified parameters.

Core Game Logic
Deck Creation and Shuffling: Upon game start, the appropriate number of decks is created, shuffled, and dealt to players.
Rounds: Each round, players take turns playing cards from their hands. If a snap condition is met, the player wins both piles.
End Game: The game ends when players run out of cards, and the player(s) with the highest score wins.
Snap Functionality
The handleSnap method in the SnapGame class determines if a snap occurs. However, the current implementation of this functionality needs improvement to accurately detect snap situations and handle them appropriately.

Retrospective

Working on the Snap Game project was an enjoyable experience. Returning to vanilla JavaScript provided an opportunity to reinforce fundamental programming concepts and improve problem-solving skills. While the project is not yet complete, tackling challenges such as implementing the snap functionality has been both challenging and rewarding. Going forward, I look forward to refining the game logic and enhancing the user experience.

Conclusion

In conclusion, the Snap Game project demonstrates my ability to work with JavaScript, apply object-oriented principles, and develop interactive applications. Despite the current limitations, I am committed to continuously improving the project and expanding my skills as a developer. Thank you for considering my submission.