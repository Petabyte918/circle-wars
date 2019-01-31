'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vectors = exports.Vectors = function () {
    function Vectors() {
        _classCallCheck(this, Vectors);
    }

    _createClass(Vectors, null, [{
        key: 'magnitude',
        value: function magnitude(vector, y) {
            var x = void 0;
            if (typeof vector === 'number' && typeof y === 'number') {
                x = vector;
            }
            if (typeof vector.x === 'number' && typeof vector.y === 'number') {
                x = vector.x;
                y = vector.y;
            }
            return Math.sqrt(x * x + y * y);
        }
    }, {
        key: 'angle',
        value: function angle(vector, y) {
            var x = void 0;
            if (typeof vector === 'number' && typeof y === 'number') {
                x = vector;
            }
            if (typeof vector.x === 'number' && typeof vector.y === 'number') {
                x = vector.x;
                y = vector.y;
            }
            return Math.atan2(y, x);
        }
    }, {
        key: 'setMagnitude',
        value: function setMagnitude(vector, y, m) {
            if (typeof vector === 'number' && typeof y === 'number' && typeof m === 'number') {
                return this.polarToCartesian(this.angle(vector, y), m);
            }
            if (typeof vector.x === 'number' && typeof vector.y === 'number' && typeof y === 'number') {
                return _extends({}, vector, this.polarToCartesian(this.angle(vector.x, vector.y), y));
            }
            throw new Error('no magnitude given');
        }
    }, {
        key: 'setAngle',
        value: function setAngle(vector, y, a) {
            if (typeof vector === 'number' && typeof y === 'number' && typeof m === 'number') {
                return this.polarToCartesian(a, this.angle(vector, y));
            }
            if (typeof vector.x === 'number' && typeof vector.y === 'number' && typeof y === 'number') {
                return _extends({}, vector, this.polarToCartesian(y, this.magnitude(vector.x, vector.y)));
            }
            throw new Error('no angle given');
        }
    }, {
        key: 'setPolar',
        value: function setPolar(vector, angle, magnitude) {
            return _extends({}, vector, this.polarToCartesian(angle, magnitude));
        }
    }, {
        key: 'add',
        value: function add(vector1, vector2, x2, y2) {
            if (typeof vector1 === 'number' && typeof vector2 === 'number' && typeof x2 === 'number' && typeof y2 === 'number') {
                return { x: vector1 + x2, y: vector2 + y2 };
            }
            if (typeof vector1.x === 'number' && typeof vector1.y === 'number' && typeof vector2.x === 'number' && typeof vector2.y === 'number') {
                return _extends({}, vector1, {
                    x: vector1.x + vector2.x,
                    y: vector1.y + vector2.y
                });
            }
            throw new Error('no two vectors given');
        }
    }, {
        key: 'mult',
        value: function mult(vector1, coefficient) {
            return _extends({}, vector1, this.polarToCartesian(this.angle(vector1), this.magnitude(vector1) * coefficient));
        }
    }, {
        key: 'polarToCartesian',
        value: function polarToCartesian(angle, magnitude) {
            return { x: magnitude * Math.cos(angle), y: magnitude * Math.sin(angle) };
        }
    }]);

    return Vectors;
}();
//# sourceMappingURL=Vectors.js.map