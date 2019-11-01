import { SpellEvent } from "./SpellEvent"

export class OnKeyDown extends SpellEvent {
    name = 'onKeyDown'
    constructor(actions) {
        super(actions)
    }
}