'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EntityBroadcastSystem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityBroadcastSystem = exports.EntityBroadcastSystem = function () {
    function EntityBroadcastSystem(io) {
        _classCallCheck(this, EntityBroadcastSystem);

        this.io = io;
    }

    _createClass(EntityBroadcastSystem, [{
        key: 'step',
        value: function step(_entities) {
            var entities = (0, _underscore.pick)(_entities, function (e) {
                return e.components.dynamic && e.components.dynamic.dirty === true || e.components.deleted;
            });
            this.io.emit('entities', entities);
            for (var entityId in entities) {
                if (entities[entityId].components.dynamic) entities[entityId].components.dynamic.dirty = false;
                if (entities[entityId].components.deleted) {
                    console.log('deleting', entityId);
                    delete _entities[entityId];
                }
            }
        }
    }]);

    return EntityBroadcastSystem;
}();
//# sourceMappingURL=EntityBroadcast.js.map