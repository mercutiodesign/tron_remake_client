import 'bootstrap/dist/css/bootstrap-reboot.css'; // using bootstrap reboot for css reset (https://github.com/twbs/bootstrap/issues/21875)
import './style.css';

function createField() {
  let field = document.createElement('canvas');
  field.width = 500; // TODO: Set height / width based on browser size
  field.height = 500;
  field.classList.add('field');
  document.body.appendChild(field);
  return field;
}

function drawExampleBox(field) {
  // Example from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
  let ctx = field.getContext('2d');
  ctx.beginPath();
  ctx.rect(125, 125, 50, 50);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.closePath();
}

let field = createField();
drawExampleBox(field);
