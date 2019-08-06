// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(paddleWidth, paddleHeight, gameDims, maxSpeed, player) {
    _classCallCheck(this, Paddle);

    this.width = paddleWidth;
    this.height = paddleHeight;
    this.gameDims = gameDims;
    this.speed = 0;
    this.maxSpeed = maxSpeed;

    if (player === "left") {
      this.position = {
        x: 0,
        y: (gameDims.height - paddleHeight) / 2
      };
    } else if (player === "right") {
      this.position = {
        x: gameDims.width - 10,
        y: (gameDims.height - paddleHeight) / 2
      };
    }
  }

  _createClass(Paddle, [{
    key: "moveUp",
    value: function moveUp() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      // draw paddle
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.width, this.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath(); // draw paddle center

      ctx.beginPath();
      ctx.arc(this.position.x + 5, this.position.y + this.height / 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{}],"src/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(image, radius, gameDims, velocity) {
    _classCallCheck(this, Ball);

    this.image = image;
    this.radius = radius;
    this.position = {
      x: gameDims.width / 2,
      y: gameDims.height / 2
    };
    this.velocity = velocity;
    this.startVelocity = velocity.dx * velocity.dx + velocity.dy * velocity.dy;
    this.velocityValue = velocity.dx * velocity.dx + velocity.dy * velocity.dy;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath(); //ctx.drawImage(this.image,this.position.x,this.position.y,this.radius,this.radius);

      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(leftPaddle, rightPaddle) {
  var _this = this;

  _classCallCheck(this, InputHandler);

  this.gamePause = false;
  document.addEventListener("keydown", function (e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
      rightPaddle.moveUp();
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      rightPaddle.moveDown();
    }

    if (e.key == "w") {
      leftPaddle.moveUp();
    } else if (e.key == "s") {
      leftPaddle.moveDown();
    }

    if (!_this.gamePause) {
      if (e.key == "p") {
        alert("Pause");
        _this.gamePause = true;
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
      rightPaddle.speed = 0;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      rightPaddle.speed = 0;
    }

    if (e.key == "w") {
      leftPaddle.speed = 0;
    } else if (e.key == "s") {
      leftPaddle.speed = 0;
    }

    if (e.key == "p") {
      _this.gamePause = false;
    }
  });
};

exports.default = InputHandler;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Paddle = _interopRequireDefault(require("./Paddle.js"));

var _Ball = _interopRequireDefault(require("./Ball.js"));

var _input = _interopRequireDefault(require("./input.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("myCanvas"); // obiekt canvas

var ctx = canvas.getContext("2d"); // odniesienie do context2D obiektu canvas

var leftScore = document.getElementById("leftScore");
var rightScore = document.getElementById("rightScore");
var gamePause = false;
var gameDims = {
  width: canvas.width,
  height: canvas.height
};
var velocity = {
  dx: 2,
  dy: -2
};
var paddlesSpeed = 5;
var ballRadius = 10;
var imageBall = document.getElementById("img_ball");
var leftPaddle = new _Paddle.default(10, 100, gameDims, paddlesSpeed, "left");
var rightPaddle = new _Paddle.default(10, 100, gameDims, paddlesSpeed, "right");
var ball = new _Ball.default(imageBall, ballRadius, gameDims, velocity);
var moveButtons = document.getElementsByClassName("movement-button");

for (var i = 0; i < moveButtons.length; i++) {
  moveButtons[i].addEventListener("mousedown", mouseDown);
  moveButtons[i].addEventListener("mouseup", mouseUp);
  moveButtons[i].addEventListener("touchstart", mouseDown);
  moveButtons[i].addEventListener("touchend", mouseUp);
}

var inputHandler = new _input.default(leftPaddle, rightPaddle);

function mouseDown() {
  if (this.id === "movement-button1") leftPaddle.moveUp();
  if (this.id === "movement-button2") leftPaddle.moveDown();
  if (this.id === "movement-button3") rightPaddle.moveUp();
  if (this.id === "movement-button4") rightPaddle.moveDown();
}

function mouseUp() {
  if (this.id === "movement-button1") leftPaddle.speed = 0;
  if (this.id === "movement-button2") leftPaddle.speed = 0;
  if (this.id === "movement-button3") rightPaddle.speed = 0;
  if (this.id === "movement-button4") rightPaddle.speed = 0;
}

function keyDownHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    UpPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    DownPressed = true;
  }

  if (e.key == "w") {
    WPressed = true;
  } else if (e.key == "s") {
    SPressed = true;
  }

  if (!gamePause) {
    if (e.key == "p") {
      alert("Pause");
      gamePause = true;
    }
  }
}

function keyUpHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    UpPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    DownPressed = false;
  }

  if (e.key == "w") {
    WPressed = false;
  } else if (e.key == "s") {
    SPressed = false;
  }

  if (e.key == "p") {
    gamePause = false;
  }
}

function movePaddles() {
  if (rightPaddle.speed > 0) {
    if (rightPaddle.position.y < canvas.height - rightPaddle.height) {
      rightPaddle.position.y += rightPaddle.speed;
    }
  }

  if (rightPaddle.speed < 0) {
    if (rightPaddle.position.y > 0) {
      rightPaddle.position.y += rightPaddle.speed;
    }
  }

  if (leftPaddle.speed > 0) {
    if (leftPaddle.position.y < canvas.height - leftPaddle.height) {
      leftPaddle.position.y += leftPaddle.speed;
    }
  }

  if (leftPaddle.speed < 0) {
    if (leftPaddle.position.y > 0) {
      leftPaddle.position.y += leftPaddle.speed;
    }
  }
}

function moveBall() {
  ball.position.x += ball.velocity.dx;
  ball.position.y += ball.velocity.dy;
}

function checkWalls() {
  if (ball.position.x + ball.velocity.dx > canvas.width - ball.radius) {
    if (ball.position.y > rightPaddle.position.y - ball.radius && ball.position.y < rightPaddle.position.y + rightPaddle.height + ball.radius) {
      calcHit("right");
    } else {
      scoreCheck(leftScore);
    }
  }

  if (ball.position.x + ball.velocity.dx < ball.radius) {
    if (ball.position.y > leftPaddle.position.y - ball.radius && ball.position.y < leftPaddle.position.y + leftPaddle.height + ball.radius) {
      calcHit("left");
    } else {
      scoreCheck(rightScore);
    }
  }

  if (ball.position.y + ball.velocity.dy > canvas.height - ball.radius || ball.position.y + ball.velocity.dy < ball.radius) {
    ball.velocity.dy = -ball.velocity.dy;
  }
}

function calcHit(hitter) {
  if (hitter == "left") {
    ball.velocity.dy = (ball.position.y - leftPaddle.position.y) / ((leftPaddle.height + 2 * ball.radius) / 4) - 2;
  }

  if (hitter == "right") {
    ball.velocity.dy = (ball.position.y - rightPaddle.position.y) / ((rightPaddle.height + 2 * ball.radius) / 4) - 2;
  }

  ball.velocity.dx = Math.sqrt(ball.velocityValue - ball.velocity.dy * ball.velocity.dy);

  if (isNaN(ball.velocity.dx)) {
    ball.velocity.dx = 1;
  }

  if (hitter == "left") {
    if (ball.velocity.dx < 0) {
      ball.velocity.dx = -ball.velocity.dx;
    }
  }

  if (hitter == "right") {
    if (ball.velocity.dx > 0) {
      ball.velocity.dx = -ball.velocity.dx;
    }
  }

  ball.velocityValue = ball.velocityValue + 2;
}

function scoreCheck(scorer) {
  ball.position.x = canvas.width / 2;
  ball.position.y = canvas.height / 2;
  ball.velocity.dx = 0;
  ball.velocity.dy = 0;
  ball.velocityValue = ball.startVelocity;

  if (scorer == leftScore) {
    leftScore.innerHTML = parseInt(leftScore.innerHTML) + 1;
    leftPaddle.height = leftPaddle.height - 10;
    setTimeout(function () {
      ball.velocity.dx = -2;
      ball.velocity.dy = 0;
    }, 2000);
  }

  if (scorer == rightScore) {
    rightScore.innerHTML = parseInt(rightScore.innerHTML) + 1;
    rightPaddle.height = rightPaddle.height - 10;
    setTimeout(function () {
      ball.velocity.dx = 2;
      ball.velocity.dy = 0;
    }, 2000);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leftPaddle.draw(ctx);
  rightPaddle.draw(ctx);
  ball.draw(ctx);
  checkWalls();
  movePaddles();
  moveBall();

  if (rightPaddle.height == 0) {
    window.clearInterval(gameLoop);
    alert("Right Wins!!!");
  }

  if (leftPaddle.height == 0) {
    window.clearInterval(gameLoop);
    alert("Left Wins!!!");
  }
}

setTimeout(function () {
  alert("Enjoy the game :)");
}, 50);
var gameLoop = setInterval(draw, 10);
},{"./Paddle.js":"src/Paddle.js","./Ball.js":"src/Ball.js","./input.js":"src/input.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61281" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map