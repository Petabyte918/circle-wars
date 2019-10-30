import { CastableBehavior } from "./behaviors/Castable"

export class Spell {
    name = 'spell'
    spellName
    behaviors
    constructor(name, castable) {
        this.spellName = name
        if (castable) this.addBehavior(new CastableBehavior())
    }

    addBehavior(behavior) {
        this.behaviors[behavior.name] = behavior
    }
}