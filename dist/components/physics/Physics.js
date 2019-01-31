"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Physics = undefined;

var _Entity2 = require("../../Entity");

var _Velocity = require("./Velocity");

var _Position = require("./Position");

var _Acceleration = require("./Acceleration");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Physics = exports.Physics = function (_Entity) {
    _inherits(Physics, _Entity);

    function Physics(x, y) {
        _classCallCheck(this, Physics);

        var _this = _possibleConstructorReturn(this, (Physics.__proto__ || Object.getPrototypeOf(Physics)).call(this));

        _this.name = 'physics';

        _this.addComponent(new _Position.Position(x, y)).addComponent(new _Velocity.Velocity()).addComponent(new _Acceleration.Acceleration());
        return _this;
    }

    return Physics;
}(_Entity2.Entity);
//# sourceMappingURL=Physics.js.map