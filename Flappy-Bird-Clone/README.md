# Flappy Bird Clone

## Overview

This project is a Flappy Bird clone built using Phaser, a popular HTML5 game framework. The game features classic Flappy Bird gameplay where players control a bird to navigate through columns and avoid obstacles.

## Video Demo

[![Video Demo](https://img.youtube.com/vi/SgASo4ypxMY/0.jpg)]([https://youtu.be/SgASo4ypxMY])

## Features

- **Game Start:** Press the spacebar to start the game.
- **Bird Movement:** Use the up arrow to make the bird move upwards.
- **Collision Detection:** The game ends when the bird collides with columns or the ground.
- **Restart Functionality:** After a game over, press the spacebar to restart the game.
- **Winning Condition:** The game ends with a win message when the bird reaches the right edge of the screen.

## Technologies Used

- **Phaser:** A fast, robust, and versatile HTML5 game framework for building 2D games.
- **HTML/CSS:** For the basic structure and styling of the webpage.

## Setup

### Prerequisites

- A modern web browser

### Installation

1. **Download Files**
Open index.html in a web browser: Simply open the index.html file in your favorite browser to start playing the game.

## Usage

**Start the Game:** Press the spacebar to start the game after loading.
**Control the Bird:** Use the up arrow key to move the bird upwards.
**Restart the Game:** When the game ends, press the spacebar to restart.

## Troubleshooting

If the game does not load or function properly:

- Ensure your browser supports HTML5 and JavaScript.
- Check the browser console for any error messages and debug accordingly.

## Contributing

Credit to David Verghese from Codedex for tutorial. Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact ft.alxx@gmail.com.

## HTML/CSS Customizations

In the index.html file:

- **Background Color:** The body background color is set to a light blue for a clear game area.
- **Text Positioning:** The text "Flappy Bird Clone" is positioned to the right of the screen for visibility.

The app.js file contains the Phaser game logic including:

- **Game Configuration:** Set up renderer, dimensions, and physics.
- **Game Scenes:** Preload, create, and update functions to handle game logic.
- **Restart Mechanism:** Allows the game to be restarted after ending.
