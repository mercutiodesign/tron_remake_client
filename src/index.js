import 'bootstrap/dist/css/bootstrap-reboot.css'; // using bootstrap reboot for css reset (https://github.com/twbs/bootstrap/issues/21875)
import './style.css';

const speed = 15 / 1000;
const fieldWidth = 50;
const fieldHeight = 50;

class FpsCounter {
  constructor(length) {
    this.pointer = -1;
    this.buffer = [];
    this.length = length;
  }

  update(time) {
    let length = this.length;
    this.pointer = (this.pointer + 1) % length;
    let last = this.buffer[this.pointer];
    this.buffer[this.pointer] = time;
    return (
      1000 * length / (time - last) ||
      1000 * this.buffer.length / (time - this.buffer[0]) // if the buffer isn't full yet
    );
  }
}

class Player {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  update(diff) {
    this.x = (this.x + this.dx * diff + fieldWidth) % fieldWidth;
    this.y = (this.y + this.dy * diff + fieldHeight) % fieldHeight;
  }

  draw(ctx) {
    ctx.fillRect(this.x - 0.5, this.y - 0.5, 1, 1);
  }
}

class Game {
  constructor() {
    this.createField();
    this.fpsCounter = new FpsCounter(100);
    this.players = [
      new Player(1, 3, 1, 0),
      new Player(43, 7, -1, 0),
      new Player(43, 47, 0, -1),
      new Player(3, 37, 0, 1),
    ];
  }

  createField(width = 500, height = 500) {
    let field = document.createElement('canvas');
    field.width = width; // TODO: Set height / width based on browser size
    field.height = height;
    field.classList.add('field');
    document.body.appendChild(field);
    this.field = field;
  }

  update(time) {
    this.fps = this.fpsCounter.update(time) || 0;
    if (this.lastUpdate !== undefined) {
      let diff = (time - this.lastUpdate) * speed;
      this.players.forEach(p => p.update(diff));
    }
    this.lastUpdate = time;
    this.draw();
  }

  draw() {
    // Example from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
    let canvas = this.field;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let scale_x = canvas.width / fieldWidth;
    let scale_y = canvas.height / fieldHeight;
    ctx.scale(scale_x, scale_y);

    ctx.fillStyle = 'white';
    this.players.forEach(p => p.draw(ctx));

    ctx.scale(1 / scale_x, 1 / scale_y);

    ctx.fillStyle = 'green';
    ctx.font = '25px sans-serif';
    ctx.fillText(this.fps.toFixed(0), 20, 35);
  }
}

function animate(time) {
  game.update(time);
  requestAnimationFrame(animate);
}

let game = new Game();
requestAnimationFrame(animate);
