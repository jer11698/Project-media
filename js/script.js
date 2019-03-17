var _isFire = 0;
//var dataEnemy, dataPlayer;

function gameStart() {
  drawEntity();
  gameArea.start();
}

function drawEntity() {
  /*var width = 50;
  this.enemyObject1 = [];
  this.enemyObject2 = [];
  this.enemyObject3 = [];
  this.enemyObject4 = [];
  this.enemyObject5 = [];
  playerObject = new component(30, 10, "yellow", 185, 240);
  for (var i = 0; i <= 17; i++) {
    width += 15;
    enemyObject1[i] = new component(10, 10, "red", width, 20);
    enemyObject2[i] = new component(10, 10, "#80ff00", width, 40);
    enemyObject3[i] = new component(10, 10, "#00ffff", width, 60);
    enemyObject4[i] = new component(10, 10, "#7f00ff", width, 80);
    enemyObject5[i] = new component(10, 10, "#ff3c00", width, 100);
  }*/
  playerObject = new component(30, 10, 39, 19, "image/player.png", 185, 240, 0, 0, "image");
  enemyObject = [[new component(17, 15, 25, 19, "image/enemy0.png", 50, 20, 0, 0, "image"), new component(17, 15, 26, 19, "image/enemy0.png", 50, 20, 25, 0, "image")],
  [new component(17, 15, 25, 19, "image/enemy0.png", 65, 40, 0, 0, "draw"), new component(17, 15, 26, 19, "image/enemy0.png", 65, 40, 25, 0, "draw")],
  [new component(17, 15, 25, 19, "image/enemy1.png", 80, 60, 0, 0, "draw"), new component(17, 15, 26, 19, "image/enemy1.png", 80, 60, 25, 0, "draw")],
  [new component(17, 15, 25, 19, "image/enemy2.png", 95, 80, 0, 0, "draw"), new component(17, 15, 26, 19, "image/enemy2.png", 95, 80, 25, 0, "draw")],
  [new component(17, 15, 25, 19, "image/enemy3.png", 110, 100, 0, 0, "draw"), new component(17, 15, 26, 19, "image/enemy3.png", 110, 100, 25, 0, "draw")]];
}

var movePlayer = {
  moveLeft: function () { playerObject.move = -2 },
  moveRight: function () { playerObject.move = 2 },
  stopMove: function () { playerObject.move = 0 },
  fire: function () {
    announce();
    ammo = new component(1, 6, 1, 6, "white", playerObject.x + 15, 230, 0, 0, );
  }
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
  }
}

function component(width, height, swidth, sheight, color, x, y, sx, sy, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.swidth = swidth;
  this.sheight = sheight;
  this.sx = sx;
  this.sy = sy;
  this.width = width;
  this.height = height;
  this.move = 0;
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.update = function () {
    ctx = gameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
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

function announce() {
  this._announce = 'fire!';
}

function updateGameArea() {
  gameArea.clear();
  /*for (var i = 0; i <= 17; i++) {
    enemyObject1[i].update();
    enemyObject2[i].update();
    enemyObject3[i].update();
    enemyObject4[i].update();
    enemyObject5[i].update();
  }*/
  enemyObject[0][0].update();
  playerObject.playerMove();
  playerObject.update();
  if (this._announce == 'fire!') {
    ammo.letFire();
    ammo.update();
  }
}

document.addEventListener('keydown', function () {
  var key = event.code;
  if (key == 'Space' && _isFire == 0) {
    _isFire += 1;
    movePlayer.fire();
  } else if (key == 'Space' && ammo.y <= 0) {
    movePlayer.fire();
  } else if (key == 'ArrowLeft') {
    movePlayer.moveLeft();
  } else if (key == 'ArrowRight') {
    movePlayer.moveRight();
  }
});

document.addEventListener('keyup', function () {
  var key = event.code;
  if (key == 'ArrowLeft') {
    movePlayer.stopMove();
  }
  else if (key == 'ArrowRight') {
    movePlayer.stopMove();
  }
});