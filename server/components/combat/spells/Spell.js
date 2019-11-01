import { CastableBehavior } from "./behaviors/Castable"

export class Spell {
    name = 'spell'
    spellName
    behaviors = {}
    events = {}
    constructor(name) {
        this.spellName = name
    }

    addBehavior(behavior) {
        this.behaviors[behavior.name] = behavior
        return this
    }

    addEvent(event) {
        this.events[event.name] = event
        return this
    }
}