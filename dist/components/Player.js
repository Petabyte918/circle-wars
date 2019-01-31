'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function Player(id) {
    _classCallCheck(this, Player);

    this.name = 'player';
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.socketId = id;
};
//# sourceMappingURL=Player.js.map