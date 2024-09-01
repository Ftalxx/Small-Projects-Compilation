let Alleycat;
let Ei;
let Petals;
let Hachi;
let Lightning;
let LOZ;
let Mask;
let Opoona;
let Teleport;

let buttons_top = [];
let buttons_middle = [];
let buttons_bottom = [];


function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  // load sounds
  Alleycat = loadSound('Alleycat.mp3');
  Ei = loadSound('Ei.mp3');
  Petals = loadSound('Petals.mp3');
  Hachi = loadSound('Hachi.mp3');
  Lightning = loadSound('Lightning.mp3');
  LOZ = loadSound('LOZ.mp3');
  Mask = loadSound('Mask.mp3');
  Opoona = loadSound('Opoona.mp3');
  Teleport = loadSound('Teleport.mp3');

  
  let b1 = new Button((width/3)-100, (height/3) - 100, 200, 80, color(226, 132, 19), color(244, 190, 124), Teleport);
  let b2 = new Button(width/2, (height/3) - 100, 200, 80, color(0, 159, 183), color(153, 241, 255), Ei);
  let b3 = new Button((2*width/3) + 100, (height/3) - 100, 200, 80, color(145, 145, 233), color(204, 204, 245), Lightning);

  let b4 = new Button((width/3) - 100, height/2, 200, 80, color(205, 92, 92), color(240, 128, 128), Petals);
  let b5 = new Button(width/2, height/2, 200, 80, color(72, 209, 204), color(175, 238,238), LOZ);
  let b6 = new Button((2*width/3) + 100, height/2, 200, 80, color(255, 215, 0), color(255, 255, 0), Opoona);

  let b7 = new Button((width/3) - 100, (2*height/3) + 100, 200, 80, color(255, 163, 175), color(255, 214, 220), Alleycat);
  let b8 = new Button(width/2, (2*height/3) + 100, 200, 80, color(143, 45, 86), color(216, 131, 166), Mask);
  let b9 = new Button((2*width/3)+ 100, (2*height/3) + 100, 200, 80, color(236, 78, 32), color(234, 162, 133), Hachi);

  buttons_top.push(b1);
  buttons_top.push(b2);
  buttons_top.push(b3);

  buttons_middle.push(b4);
  buttons_middle.push(b5);
  buttons_middle.push(b6);

  buttons_bottom.push(b7);
  buttons_bottom.push(b8);
  buttons_bottom.push(b9);
}

function mousePressed() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].clicked(mouseX, mouseY);
    buttons_middle[i].clicked(mouseX, mouseY);
    buttons_bottom[i].clicked(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].y = (height / 3) -100;
    buttons_middle[i].y = height / 2;
    buttons_bottom[i].y = (2 * height / 3) + 100;
  }
}

function draw() {
  background(130, 106, 237);
  noStroke();
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].show();
    buttons_middle[i].show();
    buttons_bottom[i].show();
  }
}

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

function mousePressed(){
  for (let i= 0; i < buttons_top.length; i++){
    buttons_top[i].stopSound();
    buttons_middle[i].stopSound();
    buttons_bottom[i].stopSound();
  }

  for (let i=0; i < buttons_top.length; i++) {
    buttons_top[i].clicked(mouseX, mouseY);
    buttons_middle[i].clicked(mouseX, mouseY);
    buttons_bottom[i].clicked(mouseX, mouseY);
  }
}