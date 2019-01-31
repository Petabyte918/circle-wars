'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collider = // 'rect' or 'circle'
exports.Collider = function Collider(type, offsetX, offsetY) {
    var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var height = arguments[4];

    _classCallCheck(this, Collider);

    this.name = 'collider';

    this.type = type || height ? 'rect' : 'circle';
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
    if (this.type === 'circle') this.radius = radius;
    if (this.type === 'rect') {
        this.width = radius * 2;
        if (typeof height === 'undefined') this.height = this.width;
    }
};
//# sourceMappingURL=Collider.js.map