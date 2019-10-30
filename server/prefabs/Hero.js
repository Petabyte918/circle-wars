import { Entity } from "../Entity";
import { Health } from "../components/Health";
import { Name } from "../components/Name";
import { Dynamic } from "../components/Dynamic";
import { Physics } from "../components/physics/Physics";
import { Drag } from '../components/physics/Drag'
import { Collider } from "../components/physics/Collider"
import { Rotation } from "../components/physics/Rotation"
import { Targetable } from "../components/combat/Targetable"

export class Hero extends Entity {
    constructor(name) {
        super()
        this.addComponent(new Name(name))
            .addComponent(new Health(20))
            .addComponent(new Physics(0, 0))
            .addComponent(new Rotation())
            .addComponent(new Drag())
            .addComponent(new Collider())
            .addComponent(new Dynamic())
            .addComponent(new Targetable())
    }
}