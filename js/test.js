function gameStart() {
  drawEntity();
  gameArea.start();
}

function drawEntity() {
  playerObject = new component(30, 10, "yellow", 185, 240);
}

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 400;
    this.canvas.height = 280;
    this.canvas.setAttribute("style", "display: block;position: relative;top: 17vmin;background-color: black;margin: 0 auto;width: 50%;")
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.move = 0;
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.update = function () {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.letFire = function () {
    this.y -= this.speed;
  }
  this.stopFire = function () {
    this.y -= 0;
  }
  this.playerMove = function () {
    this.x += this.move;
  }
}

var movePlayer = {
  moveLeft: function () { playerObject.move = -2 },
  moveRight: function () { playerObject.move = 2 },
  stopMove: function () { playerObject.move = 0 },
  fire: function () {
    this.announce = 'fire!';
    ammo = new component(1, 6, "white", 200, 230);
  }
}


function updateGameArea() {
  gameArea.clear();
  playerObject.playerMove();
  playerObject.update();
  if (movePlayer.fire.announce == 'fire!') {
    ammo.letFire();
    ammo.update();
  }
}

document.addEventListener('keydown', function () {
  var key = event.code;
  if (key == 'Space') {
    movePlayer.fire();
  } else if (key == 'ArrowLeft') {
    movePlayer.moveLeft();
    //moveLeft();
  } else if (key == 'ArrowRight') {
    //moveRight();
    movePlayer.moveRight();
  }
});

document.addEventListener('keyup', function () {
  var key = event.code;
  if (key == 'ArrowLeft') {
    //stopMove();
    movePlayer.stopMove();
  }
  else if (key == 'ArrowRight') {
    //stopMove();
    movePlayer.stopMove();
  }
});