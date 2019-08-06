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
})({"Paddle.js":[function(require,module,exports) {
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
  function Paddle(paddleWidth, paddleHeight, gameDims, player) {
    _classCallCheck(this, Paddle);

    this.width = paddleWidth;
    this.height = paddleHeight;

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
},{}],"Game.js":[function(require,module,exports) {
"use strict";

var _Paddle = _interopRequireDefault(require("./Paddle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("myCanvas"); // obiekt canvas

var ctx = canvas.getContext("2d"); // odniesienie do context2D obiektu canvas

var leftScore = document.getElementById("leftScore");
var rightScore = document.getElementById("rightScore");
var ballRadius = 10; // promień piłki

var x = canvas.width / 2; // pozycja startowa X (pozioma) piłki

var y = canvas.height / 2; // pozycja startowa Y (pionowa) piłki

var dx = 2; // szybkość piłki w osi poziomej

var dy = -2; // szybkość piłki w osi pionowej

var velocity = dx * dx + dy * dy;
var Vel = velocity;
var gamePause = false;
var gameDims = {
  width: canvas.width,
  height: canvas.height
};
var leftPaddle = new _Paddle.default(10, 100, gameDims, "left");
var rightPaddle = new _Paddle.default(10, 100, gameDims, "right");
var leftPaddleHeight = 100;
var leftPaddleWidth = 10;
var leftPaddleY = (canvas.height - leftPaddleHeight) / 2;
var rightPaddleHeight = 100;
var rightPaddleWidth = 10;
var rightPaddleY = (canvas.height - rightPaddleHeight) / 2;
var WPressed = false;
var SPressed = false;
var UpPressed = false;
var DownPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function mouseDown(arg) {
  if (arg === 1) WPressed = true;
  if (arg === 2) SPressed = true;
  if (arg === 3) UpPressed = true;
  if (arg === 4) DownPressed = true;
}

function mouseUp(arg) {
  if (arg === 1) WPressed = false;
  if (arg === 2) SPressed = false;
  if (arg === 3) UpPressed = false;
  if (arg === 4) DownPressed = false;
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
  if (DownPressed && rightPaddleY < canvas.height - rightPaddleHeight) {
    rightPaddleY += 5;
  } else if (UpPressed && rightPaddleY > 0) {
    rightPaddleY -= 5;
  }

  if (SPressed && leftPaddleY < canvas.height - leftPaddleHeight) {
    leftPaddleY += 5;
  } else if (WPressed && leftPaddleY > 0) {
    leftPaddleY -= 5;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddles() {
  ctx.beginPath();
  ctx.rect(0, leftPaddleY, leftPaddleWidth, leftPaddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(5, leftPaddleY + leftPaddleHeight / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(canvas.width - 10, rightPaddleY, rightPaddleWidth, rightPaddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(canvas.width - 5, rightPaddleY + rightPaddleHeight / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function checkWalls() {
  if (x + dx > canvas.width - ballRadius) {
    if (y > rightPaddleY - ballRadius && y < rightPaddleY + rightPaddleHeight + ballRadius) {
      calcHit("right");
    } else {
      scoreCheck(leftScore);
    }
  }

  if (x + dx < ballRadius) {
    if (y > leftPaddleY - ballRadius && y < leftPaddleY + leftPaddleHeight + ballRadius) {
      calcHit("left");
    } else {
      scoreCheck(rightScore);
    }
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
}

function calcHit(hitter) {
  if (hitter == "left") {
    dy = (y - leftPaddleY) / ((leftPaddleHeight + 2 * ballRadius) / 4) - 2;
  }

  if (hitter == "right") {
    dy = (y - rightPaddleY) / ((rightPaddleHeight + 2 * ballRadius) / 4) - 2;
  }

  dx = Math.sqrt(velocity - dy * dy);

  if (isNaN(dx)) {
    dx = 1;
  }

  if (hitter == "left") {
    if (dx < 0) {
      dx = -dx;
    }
  }

  if (hitter == "right") {
    if (dx > 0) {
      dx = -dx;
    }
  }

  velocity = velocity + 2;
}

function scoreCheck(scorer) {
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = 0;
  dy = 0;
  velocity = Vel;

  if (scorer == leftScore) {
    leftScore.innerHTML = parseInt(leftScore.innerHTML) + 1;
    leftPaddleHeight = leftPaddleHeight - 10;
    setTimeout(function () {
      dx = -2;
      dy = 0;
    }, 2000);
  }

  if (scorer == rightScore) {
    rightScore.innerHTML = parseInt(rightScore.innerHTML) + 1;
    rightPaddleHeight = rightPaddleHeight - 10;
    setTimeout(function () {
      dx = 2;
      dy = 0;
    }, 2000);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddles();
  checkWalls();
  movePaddles();

  if (rightPaddleHeight == 0) {
    window.clearInterval(gameLoop);
    alert("Right Wins!!!");
  }

  if (leftPaddleHeight == 0) {
    window.clearInterval(gameLoop);
    alert("Left Wins!!!");
  }

  x += dx;
  y += dy;
}

setTimeout(function () {
  alert("Enjoy the game :)");
}, 50);
var gameLoop = setInterval(draw, 10);
},{"./Paddle.js":"Paddle.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52803" + '/');

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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Game.js"], null)
//# sourceMappingURL=/Game.ae39c5c6.js.map