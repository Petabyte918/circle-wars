import { CastableBehavior } from "./behaviors/Castable"

export class Spell {
    name = 'spell'
    spellName
    manaCost
    behaviors = {}
    events = {}
    constructor(name, manaCost) {
        this.spellName = name
        this.manaCost = manaCost
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