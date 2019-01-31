'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PhysicsSystem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _Vectors = require('../Vectors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhysicsSystem = exports.PhysicsSystem = function () {
    function PhysicsSystem(ticLength) {
        _classCallCheck(this, PhysicsSystem);

        this.ticLength = ticLength || 25;
    }

    _createClass(PhysicsSystem, [{
        key: 'step',
        value: function step(entities) {
            for (var entityKey in entities) {
                this.physicsExtrapolation(entities[entityKey], this.ticLength, (0, _underscore.pick)(entities, function (e) {
                    return e.components.collider && !e.components.dynamic;
                }));
            }
        }
    }, {
        key: 'physicsExtrapolation',
        value: function physicsExtrapolation(entity, ticLength, colliders) {
            var timeCoefficient = ticLength / 25;
            var position = entity.components.position;
            var velocity = entity.components.velocity;
            var acceleration = entity.components.acceleration;
            var collision = false;
            if (!position) return;
            if (!velocity) return;
            if (_Vectors.Vectors.magnitude(velocity) === 0 && !acceleration) return;
            if (_Vectors.Vectors.magnitude(velocity) === 0 && _Vectors.Vectors.magnitude(acceleration) === 0) return;
            for (var colliderId in colliders) {
                if (colliderId === entity.id) continue;
                var staticCollider = colliders[colliderId];
                var staticColliderPosition = _Vectors.Vectors.add(colliders[colliderId].components.position, { x: colliders[colliderId].components.collider.offsetX, y: colliders[colliderId].components.collider.offsetY });
                collision = this.checkCollision(entity, _Vectors.Vectors.add(position, _Vectors.Vectors.mult(velocity, timeCoefficient)), staticCollider, staticColliderPosition);
            }
            if (entity.components.drag) {
                var vDirection = _Vectors.Vectors.angle(velocity);
                var vMagnitude = _Vectors.Vectors.magnitude(velocity);
                var vPctMax = vMagnitude / velocity.max;
                var drag = _Vectors.Vectors.polarToCartesian(vDirection + Math.PI, vPctMax * acceleration.norm);

                acceleration = _Vectors.Vectors.add(acceleration, drag);
            }
            if (_Vectors.Vectors.magnitude(acceleration) !== 0) {
                if (collision) {
                    if (collision.x > 0) {
                        if (acceleration.x < 0) acceleration.x = 0;
                    } else if (collision.x < 0) {
                        if (acceleration.x > 0) acceleration.x = 0;
                    }
                    if (collision.y > 0) {
                        if (acceleration.y < 0) acceleration.y = 0;
                    } else if (collision.y < 0) {
                        if (acceleration.y > 0) acceleration.y = 0;
                    }
                }
                entity.components.velocity = _Vectors.Vectors.add(velocity, _Vectors.Vectors.mult(acceleration, timeCoefficient));
            }
            if (_Vectors.Vectors.magnitude(velocity) !== 0) {
                if (_Vectors.Vectors.magnitude(entity.components.velocity) > velocity.max) {
                    entity.components.velocity = _Vectors.Vectors.setMagnitude(velocity, velocity.max);
                }
                if (_Vectors.Vectors.magnitude(entity.components.velocity) < 0.01) {
                    entity.components.velocity.x = 0;
                    entity.components.velocity.y = 0;
                }
                if (collision) {
                    if (collision.x > 0) {
                        if (velocity.x < 0) entity.components.velocity.x = 0;
                    } else if (collision.x < 0) {
                        if (velocity.x > 0) entity.components.velocity.x = 0;
                    }
                    if (collision.y > 0) {
                        if (velocity.y < 0) entity.components.velocity.y = 0;
                    } else if (collision.y < 0) {
                        if (velocity.y > 0) entity.components.velocity.y = 0;
                    }
                }
                entity.components.position = _Vectors.Vectors.add(position, _Vectors.Vectors.mult(entity.components.velocity, timeCoefficient));
                entity.components.dynamic.dirty = true;
            }
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision(entityA, positionA, entityB, positionB) {
            var colliderA = entityA.components.collider;
            colliderA.x = positionA.x + colliderA.offsetX;
            colliderA.y = positionA.y + colliderA.offsetY;
            var colliderB = entityB.components.collider;
            colliderB.x = positionB.x + colliderB.offsetX;
            colliderB.y = positionB.y + colliderB.offsetY;

            if (colliderA.type === 'circle' && colliderB.type === 'rect') {
                return circleRect(colliderA, colliderB);
            } else if (colliderA.type === 'rect' && colliderB.type === 'circle') {
                return circleRect(colliderB, colliderA);
            } else if (colliderA.type === 'circle' && colliderB.type === 'circle') {
                return circleCircle(colliderA, colliderB);
            } else if (colliderA.type === 'rect' && colliderB.type === 'rect') {
                return rectRect(colliderB, colliderA);
            }

            function circleRect(circle, rect) {
                var rectX1 = rect.x - rect.width / 2;
                var rectX2 = rect.x + rect.width / 2;
                var rectY1 = rect.y - rect.height / 2;
                var rectY2 = rect.y + rect.height / 2;
                var nearestX = Math.max(rect.x - rect.width / 2, Math.min(circle.x, rect.x + rect.width / 2));
                var nearestY = Math.max(rect.y - rect.height / 2, Math.min(circle.y, rect.y + rect.height / 2));
                var deltaX = circle.x - nearestX;
                var deltaY = circle.y - nearestY;
                if (deltaX * deltaX + deltaY * deltaY < circle.radius * circle.radius) {
                    if (nearestX > rectX1 && nearestX < rectX2) {
                        if (Math.abs(nearestY - rectY1) < Math.abs(nearestY - rectY2)) {
                            return { x: 0, y: -1 };
                        } else {
                            return { x: 0, y: 1 };
                        }
                    } else if (nearestY > rectY1 && nearestY < rectY2) {
                        if (Math.abs(nearestX - rectX1) < Math.abs(nearestX - rectX2)) {
                            return { x: -1, y: 0 };
                        } else {
                            return { x: 1, y: 0 };
                        }
                    } else {
                        if (circle.x < nearestX && circle.y < nearestY) {
                            return { x: -1, y: -1 };
                        }
                        if (circle.x > nearestX && circle.y < nearestY) {
                            return { x: 1, y: -1 };
                        }
                        if (circle.x < nearestX && circle.y > nearestY) {
                            return { x: -1, y: 1 };
                        }
                        if (circle.x > nearestX && circle.y > nearestY) {
                            return { x: 1, y: 1 };
                        }
                    }
                } else return false;
            }

            function circleCircle(circleA, circleB) {}

            function rectRect(rectA, rectB) {}
        }
    }]);

    return PhysicsSystem;
}();
//# sourceMappingURL=Physics.js.map