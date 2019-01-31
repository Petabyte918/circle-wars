'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Incoming = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vectors = require('./Vectors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Incoming = exports.Incoming = function () {
    function Incoming(socket, hero, entities) {
        _classCallCheck(this, Incoming);

        this.socket = socket;
        this.hero = hero;

        this.directions(socket, hero);
    }

    _createClass(Incoming, [{
        key: 'directions',
        value: function directions(socket, hero) {
            socket.on('startUp', function () {
                hero.components.player.up = true;
                calculateAcceleration();
            });
            socket.on('startDown', function () {
                hero.components.player.down = true;
                calculateAcceleration();
            });
            socket.on('startLeft', function () {
                hero.components.player.left = true;
                calculateAcceleration();
            });
            socket.on('startRight', function () {
                hero.components.player.right = true;
                calculateAcceleration();
            });
            socket.on('endUp', function () {
                hero.components.player.up = false;
                calculateAcceleration();
            });
            socket.on('endDown', function () {
                hero.components.player.down = false;
                calculateAcceleration();
            });
            socket.on('endLeft', function () {
                hero.components.player.left = false;
                calculateAcceleration();
            });
            socket.on('endRight', function () {
                hero.components.player.right = false;
                calculateAcceleration();
            });

            function calculateAcceleration() {
                var up = hero.components.player.up;
                var down = hero.components.player.down;
                var left = hero.components.player.left;
                var right = hero.components.player.right;

                if (up) {
                    if (down) {
                        if (left) {
                            if (right) {
                                hero.components.acceleration.x = 0;
                                hero.components.acceleration.y = 0;
                            } else {
                                hero.components.acceleration.x = -hero.components.acceleration.norm;
                                hero.components.acceleration.y = 0;
                            }
                        } else if (right) {
                            hero.components.acceleration.x = hero.components.acceleration.norm;
                            hero.components.acceleration.y = 0;
                        } else {
                            hero.components.acceleration.x = 0;
                            hero.components.acceleration.y = 0;
                        }
                    } else if (left) {
                        if (right) {
                            hero.components.acceleration.x = 0;
                            hero.components.acceleration.y = -hero.components.acceleration.norm;
                        } else {
                            hero.components.acceleration = _Vectors.Vectors.setPolar(hero.components.acceleration, -Math.PI * 3 / 4, hero.components.acceleration.norm);
                        }
                    } else if (right) {
                        hero.components.acceleration = _Vectors.Vectors.setPolar(hero.components.acceleration, -Math.PI * 1 / 4, hero.components.acceleration.norm);
                    } else {
                        hero.components.acceleration.x = 0;
                        hero.components.acceleration.y = -hero.components.acceleration.norm;
                    }
                } else if (down) {
                    if (left) {
                        if (right) {
                            hero.components.acceleration.x = 0;
                            hero.components.acceleration.y = hero.components.acceleration.norm;
                        } else {
                            hero.components.acceleration = _Vectors.Vectors.setPolar(hero.components.acceleration, Math.PI * 3 / 4, hero.components.acceleration.norm);
                        }
                    } else if (right) {
                        hero.components.acceleration = _Vectors.Vectors.setPolar(hero.components.acceleration, Math.PI * 1 / 4, hero.components.acceleration.norm);
                    } else {
                        hero.components.acceleration.x = 0;
                        hero.components.acceleration.y = hero.components.acceleration.norm;
                    }
                } else if (left) {
                    if (right) {
                        hero.components.acceleration.x = 0;
                        hero.components.acceleration.y = 0;
                    } else {
                        hero.components.acceleration.x = -hero.components.acceleration.norm;
                        hero.components.acceleration.y = 0;
                    }
                } else if (right) {
                    hero.components.acceleration.x = hero.components.acceleration.norm;
                    hero.components.acceleration.y = 0;
                } else {
                    hero.components.acceleration.x = 0;
                    hero.components.acceleration.y = 0;
                }
            }
        }
    }]);

    return Incoming;
}();
//# sourceMappingURL=Incoming.js.map