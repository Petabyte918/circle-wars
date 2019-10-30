import { Type } from "../../Type"
import { Targeted } from "./Targeted"
import { Physics } from "../../physics/Physics"

export class Projectile extends Entity {
    name = 'projectile'
    speed
    constructor(speed, initialPosition, targetId) {
        super()
        this.speed = speed
        if (targeted) this.addComponent(new Targeted(targetId))
        this.addComponent(new Type('projectile'))
            .addComponent(new Physics(initialPosition.x, initialPosition.y))
    }
}