"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hero = undefined;

var _Entity2 = require("./Entity");

var _Health = require("./components/Health");

var _Name = require("./components/Name");

var _Dynamic = require("./components/Dynamic");

var _Physics = require("./components/physics/Physics");

var _Drag = require("./components/physics/Drag");

var _Collider = require("./components/physics/Collider");

var _Rotation = require("./components/physics/Rotation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = exports.Hero = function (_Entity) {
    _inherits(Hero, _Entity);

    function Hero(name) {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.addComponent(new _Name.Name(name)).addComponent(new _Health.Health(20)).addComponent(new _Physics.Physics(0, 0)).addComponent(new _Rotation.Rotation()).addComponent(new _Drag.Drag()).addComponent(new _Collider.Collider()).addComponent(new _Dynamic.Dynamic());
        return _this;
    }

    return Hero;
}(_Entity2.Entity);
//# sourceMappingURL=Hero.js.map