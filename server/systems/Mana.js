import { pick } from 'underscore'
export class ManaSystem {
    ticLength

    constructor(ticLength) {
        this.ticLength = ticLength || 25
    }

    step(_entities) {
        const entities = pick(_entities, e => e.components.mana && e.components.mana.currentMana !== e.components.mana.value)
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            entity.components.mana.currentMana += entity.components.mana.regen
            if (entity.components.mana.currentMana > entity.components.mana.value) entity.components.mana.currentMana = entity.components.mana.value
            entity.components.dynamic.dirty = true
        }
    }
}
