var playerObject; // กำหนดตัวผู้เล่น

function startGame() {
  drawEntity();
  gameArea.start();
}

function drawEntity() {
  var width = 50;
  this.enemyObject1 = [];
  this.enemyObject2 = [];
  this.enemyObject3 = [];
  this.enemyObject4 = [];
  this.enemyObject5 = [];
  //playerObject = new component(30, 10, "image/player.png", 185, 240, "image");
  playerObject = player()
  for (var i = 0; i <= 17; i++) {
    width += 15;
    enemyObject1[i] = new component(10, 10, "red", width, 20, "draw");
    enemyObject2[i] = new component(10, 10, "#80ff00", width, 40, "draw");
    enemyObject3[i] = new component(10, 10, "#00ffff", width, 60, "draw");
    enemyObject4[i] = new component(10, 10, "#7f00ff", width, 80, "draw");
    enemyObject5[i] = new component(10, 10, "#ff3c00", width, 100, "draw");
  ammo = new component(1, 6, "white", 200, 240, "draw");
  }
}

function player(){
  return new component(30, 10, "image/player.png", 185, 240, "image");
}

player.prototype.fire = function() {
  return new component(1, 6, "white", this.width, 240, "draw");
}

var movePlayer =  {
  moveLeft: function(){playerObject.move = -2},
  moveRight: function(){playerObject.move = 2},
  stopMove: function(){playerObject.move = 0},
  fire: function(){}
}

//พื้นที่เริ่ม
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
  stop: function () {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.move = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = gameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.playerMove = function () {
    this.x += this.move;
  }
}

function updateGameArea() {
  gameArea.clear();
  for (var i = 0; i <= 17; i++) {
    enemyObject1[i].update();
    enemyObject2[i].update();
    enemyObject3[i].update();
    enemyObject4[i].update();
    enemyObject5[i].update();
  }
  ammo.update();
  playerObject.playerMove();
  playerObject.update();
}

/*function moveLeft() {
  playerObject.move = -2;
}

function moveRight() {
  playerObject.move = 2;
}

function stopMove() {
  playerObject.move = 0;
}*/

document.addEventListener('keydown', function () {
  var key = event.code;
  if (key == 'ArrowLeft') {
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



