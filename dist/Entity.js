"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = exports.Entity = function () {
    function Entity() {
        _classCallCheck(this, Entity);

        this.components = {};

        this.id = (+new Date()).toString(16) + (Math.random() * 100000 | 0).toString(16);
    }

    _createClass(Entity, [{
        key: "addComponent",
        value: function addComponent(comp) {
            if (comp.components) {
                this.components = _extends({}, this.components, comp.components);
            } else {
                this.components[comp.name] = comp;
            }
            return this;
        }
    }, {
        key: "removeComponent",
        value: function removeComponent(compName) {
            delete this.components[compName];
            return this;
        }
    }]);

    return Entity;
}();
//# sourceMappingURL=Entity.js.map