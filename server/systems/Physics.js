import {pick} from 'underscore'
import {Vectors} from '../Vectors'

export class PhysicsSystem {
    ticLength

    constructor(ticLength) {
        this.ticLength = ticLength || 25
    }
    
    step(entities) {
        for (let entityKey in entities) {
            this.physicsExtrapolation(entities[entityKey], this.ticLength, pick(entities, e => (e.components.collider && !e.components.dynamic)))
        }
    }

    physicsExtrapolation(entity, ticLength, colliders) {
        const timeCoefficient = ticLength / 25
        let position = entity.components.position
        let velocity = entity.components.velocity
        let acceleration = entity.components.acceleration
        let collision = false
        if (!position) return
        if (!velocity) return
        if (Vectors.magnitude(velocity) === 0 && !acceleration) return
        if (Vectors.magnitude(velocity) === 0 && Vectors.magnitude(acceleration) === 0) return
        for (let colliderId in colliders) {
            if (colliderId === entity.id) continue
            const staticCollider = colliders[colliderId]
            const staticColliderPosition = Vectors.add(colliders[colliderId].components.position, {x: colliders[colliderId].components.collider.offsetX, y: colliders[colliderId].components.collider.offsetY})
            collision = this.checkCollision(entity, Vectors.add(position, Vectors.mult(velocity, timeCoefficient)), staticCollider, staticColliderPosition)
        }
        if (entity.components.drag) {
            const vDirection = Vectors.angle(velocity)
            const vMagnitude = Vectors.magnitude(velocity)
            const vPctMax = vMagnitude / velocity.max
            const drag = Vectors.polarToCartesian(vDirection + Math.PI, vPctMax * acceleration.norm)

            acceleration = Vectors.add(acceleration, drag)
        }
        if (Vectors.magnitude(acceleration) !== 0) {
            if (collision) {
                if (collision.x > 0) {
                    if (acceleration.x < 0) acceleration.x = 0
                } else if (collision.x < 0) {
                    if (acceleration.x > 0) acceleration.x = 0
                }
                if (collision.y > 0) {
                    if (acceleration.y < 0) acceleration.y = 0
                } else if (collision.y < 0) {
                    if (acceleration.y > 0) acceleration.y = 0
                }
            }
            entity.components.velocity = Vectors.add(velocity,Vectors.mult(acceleration, timeCoefficient))
        }
        if (Vectors.magnitude(velocity) !== 0) {
            if (Vectors.magnitude(entity.components.velocity) > velocity.max) {
                entity.components.velocity = Vectors.setMagnitude(velocity, velocity.max)
            }
            if (Vectors.magnitude(entity.components.velocity) < 0.01) {
                entity.components.velocity.x = 0
                entity.components.velocity.y = 0
            }
            if (collision) {
                if (collision.x > 0) {
                    if (velocity.x < 0) entity.components.velocity.x = 0
                } else if (collision.x < 0) {
                    if (velocity.x > 0) entity.components.velocity.x = 0
                }
                if (collision.y > 0) {
                    if (velocity.y < 0) entity.components.velocity.y = 0
                } else if (collision.y < 0) {
                    if (velocity.y > 0) entity.components.velocity.y = 0
                }
            }
            entity.components.position = Vectors.add(position,Vectors.mult(entity.components.velocity, timeCoefficient))
            entity.components.dynamic.dirty = true
        }
    }

    checkCollision(entityA, positionA, entityB, positionB) {
        const colliderA = entityA.components.collider
        colliderA.x = positionA.x + colliderA.offsetX
        colliderA.y = positionA.y + colliderA.offsetY
        const colliderB = entityB.components.collider
        colliderB.x = positionB.x + colliderB.offsetX
        colliderB.y = positionB.y + colliderB.offsetY

        if (colliderA.type === 'circle' && colliderB.type === 'rect') {
            return circleRect(colliderA, colliderB)
        } else if (colliderA.type === 'rect' && colliderB.type === 'circle') {
            return circleRect(colliderB, colliderA)
        } else if (colliderA.type === 'circle' && colliderB.type === 'circle') {
            return circleCircle(colliderA, colliderB)
        } else if (colliderA.type === 'rect' && colliderB.type === 'rect') {
            return rectRect(colliderB, colliderA)
        }

        function circleRect(circle, rect) {
            const rectX1 = rect.x - rect.width / 2
            const rectX2 = rect.x + rect.width / 2
            const rectY1 = rect.y - rect.height / 2
            const rectY2 = rect.y + rect.height / 2
            const nearestX = Math.max(rect.x - rect.width / 2, Math.min(circle.x, rect.x + rect.width / 2))
            const nearestY = Math.max(rect.y - rect.height / 2, Math.min(circle.y, rect.y + rect.height / 2))
            const deltaX = circle.x - nearestX
            const deltaY = circle.y - nearestY
            if ((deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius)) {
                if (nearestX > rectX1 && nearestX < rectX2) {
                    if (Math.abs(nearestY - rectY1) < Math.abs(nearestY - rectY2)) {
                        return {x:0, y:-1}
                    } else {
                        return {x:0, y:1}
                    }
                } else if (nearestY > rectY1 && nearestY < rectY2) {
                    if (Math.abs(nearestX - rectX1) < Math.abs(nearestX - rectX2)) {
                        return {x:-1,y:0}
                    } else {
                        return {x:1,y:0}
                    }
                } else {
                    if (circle.x < nearestX && circle.y < nearestY) {
                        return {x:-1, y:-1}
                    }
                    if (circle.x > nearestX && circle.y < nearestY) {
                        return {x:1, y:-1}
                    }
                    if (circle.x < nearestX && circle.y > nearestY) {
                        return {x:-1, y:1}
                    }
                    if (circle.x > nearestX && circle.y > nearestY) {
                        return {x:1, y:1}
                    }
                }
            }
            else return false
        }

        function circleCircle(circleA, circleB) {

        }

        function rectRect(rectA, rectB) {

        }
    }
}