
var football = (function() {
  var requestAnimation = function(callback) {
    return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function() {
            setTimeout(callback, 1000 / 60);
          }
  }

  var canvas, context, image;

  function Ball(options) {
    this.w = options.width;
    this.h = options.height;
    this.x = options.left;
    this.y = options.top;
    this.img = options.image;
  }
  Ball.prototype.draw = function() {
    console.log(this);
    context.drawImage(this.img,
      0, 0, 100, 100,
      this.x, this.y, this.w, this.h
    );
  }

  function loadBall() {
    var ball = new Ball({
      // width: 100,
      // height: 100,
      width: image.width,
      height: image.height,
      left: 0,
      top: 0,
      image: image
    })
    ball.draw();
  }

  function init() {
    canvas = document.getElementById('football');
    context = canvas.getContext('2d');
    image = new Image();
    image.src = './football.png';
    image.onload = loadBall;
  }
  
  var football = {
    play: function() {
      init();
    }
  }

  return football;
})();
