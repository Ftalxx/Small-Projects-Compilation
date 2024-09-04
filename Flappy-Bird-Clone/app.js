let config = {
    renderer: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game variable
let game = new Phaser.Game(config);

// Load images and bird as sprite to animate
function preload() {
    this.load.image('background', 'assets/assets/background.png');
    this.load.image('road', 'assets/assets/road.png');
    this.load.image('column', 'assets/assets/column.png');
    this.load.spritesheet('bird', 'assets/assets/bird.png', {
        frameWidth: 64,
        frameHeight: 96
    });
}

// Define variables globally
let bird;
let hasLanded = false;
let cursors;
let hasBumped = false;
let isGameStarted = false;
let messageToPlayer;

// Function to create game environment (Cursors, Physics, Road, Background, Columns)
function create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const roads = this.physics.add.staticGroup();
    const topColumns = this.physics.add.staticGroup({
        key: 'column',
        repeat: 1,
        setXY: { x: 200, y: 0, stepX: 300 },
    });

    const bottomColumns = this.physics.add.staticGroup({
        key: 'column',
        repeat: 1,
        setXY: { x: 350, y: 400, stepX: 300 },
    });

    const road = roads.create(400, 568, 'road').setScale(2).refreshBody();

    // Bird physics - It's a sprite with a dynamic body
    bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
    bird.setBounce(0.2);
    bird.setCollideWorldBounds(true);

    // End game when bird hits the ground
    this.physics.add.overlap(bird, road, () => hasLanded = true, null, this);
    this.physics.add.collider(bird, road);

    // Up arrow moves bird upwards
    cursors = this.input.keyboard.createCursorKeys();

    // Detect when bird hits column
    this.physics.add.overlap(bird, topColumns, () => hasBumped = true, null, this);
    this.physics.add.overlap(bird, bottomColumns, () => hasBumped = true, null, this);
    this.physics.add.collider(bird, topColumns);
    this.physics.add.collider(bird, bottomColumns);

    messageToPlayer = this.add.text(0, 0, `Instructions: Press space bar to start`, {
        fontFamily: '"Comic Sans MS", Times, serif',
        fontSize: "20px",
        color: "white",
        backgroundColor: "black"
    });
    Phaser.Display.Align.In.BottomCenter(messageToPlayer, background, 0, 50);
}

function update() {
    if (cursors.space.isDown && !isGameStarted) {
        isGameStarted = true;
        messageToPlayer.text = 'Instructions: Press the "^" button to stay upright\nAnd don\'t hit the columns or ground';
    }

    if (!isGameStarted) {
        bird.setVelocityY(-160);
    }

    // Move bird upwards
    if (cursors.up.isDown && !hasLanded && !hasBumped) {
        bird.setVelocityY(-160);
    }

    // Move bird right if game started and it hasn't landed on or bumped into something
    if (isGameStarted && (!hasLanded || !hasBumped)) {
        bird.body.velocity.x = 50;
    } else {
        bird.body.velocity.x = 0;
    }

    if (hasLanded || hasBumped) {
        messageToPlayer.text = 'Oh no! You crashed!\nPress spacebar to restart';

        // Listen for spacebar press to restart the game
        if (cursors.space.isDown) {
            restartGame.call(this);
        }
    }

    if (bird.x > 750) {
        bird.setVelocityY(40);
        messageToPlayer.text = 'Congrats! You won!';
    }
}

function restartGame() {
    // Reset game-related variables
    hasLanded = false;
    hasBumped = false;
    isGameStarted = false;

    // Reset bird position and velocity
    bird.setPosition(0, 50);
    bird.setVelocity(0, 0);

    // Reset message
    messageToPlayer.text = 'Instructions: Press space bar to start';
}

