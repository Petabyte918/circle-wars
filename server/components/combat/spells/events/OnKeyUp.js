import { SpellEvent } from "./SpellEvent"

export class OnKeyUp extends SpellEvent {
    name = 'onKeyUp'
    constructor(actions) {
        super(actions)
    }
}