import { SpellEvent } from "./SpellEvent"

export class OnFinishCasting extends SpellEvent {
    name = 'onFinishCasting'
    constructor(actions) {
        super(actions)
    }
}