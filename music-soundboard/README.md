# Music Soundboard

## Overview
This project is a soundboard created using p5.js, designed to play various sounds through a grid of interactive buttons. Each button triggers a specific sound when clicked. The project utilizes p5.js for both the layout and sound functionality.

## Features
- **Interactive Button Grid**: A 3x3 grid of buttons, each associated with a different sound.
- **Sound Playback**: Each button, when clicked, plays a corresponding sound file.
- **Stop Sound**: Function to stop previous sound when new one is introduced.
- **Custom Styling**: All visual styling and layout are handled directly in the sketch.js file.

## Files
**sketch.js**: The main JavaScript file where all the functionality and styling are defined. It includes the setup for the p5.js canvas, button creation, and sound handling.

## Usage
1. **Load sketch.js**: The project runs directly from the sketch.js file. Make sure you have p5.js included in your HTML file or use the p5.js web editor.

2. **Add Your Sounds**: Replace the sound file paths in the sketch.js file with the paths to your own sound files.

3. **Run the Project**: Open your HTML file in a web browser or run the project through the p5.js web editor.

## Details

- **Layout and Styling**
The layout and styling of the buttons are handled directly within sketch.js. The file sets up a 3x3 grid of buttons and applies styling for spacing and alignment. Customizations to button size, spacing, and grid arrangement are also managed within this file.

- **Button Functionality**
Each button is linked to a sound file. Clicking a button will play the associated sound, with functionality defined within the sketch.js file.

## Example
Here’s a brief overview of how the button grid is set up in sketch.js:

```javascript
class Button {
  constructor(x, y, w, h, color, accent, sound) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.accent = accent;
    this.sound = sound;
  }

  show() {
    noStroke();

    fill(this.color);
    rect((this.x - 100), this.y, this.w, 50);

    fill(this.accent);
    ellipse(this.x, this.y, this.w, this.h);

    fill(this.color);
    arc(this.x, (this.y + 50), this.w, this.h, TWO_PI, PI);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);

    if (d < this.w / 2) {
      this.y = this.y + 10;
      this.sound.play();
    }
  }

  stopSound() {
    if (this.sound.isPlaying()){
      this.sound.stop();
    }
  }
}
```

## Contributing
Credit to Ellie Popoca for tutorial in Codedex. Feel free to fork the repository and make modifications. If you have suggestions for improvements or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
