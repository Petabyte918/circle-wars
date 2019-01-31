import { Entity } from "../../Entity";
import { Velocity } from "./Velocity";
import { Position } from "./Position";
import { Acceleration } from "./Acceleration";

export class Physics extends Entity {
    name = 'physics'

    constructor(x, y) {
        super()
        this.addComponent(new Position(x, y))
            .addComponent(new Velocity())
            .addComponent(new Acceleration())
    }
}