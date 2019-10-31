import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        console.log(_entities)
        const entities = pick(_entities, e => e.components.caster && e.components.caster.spellcastPending)
        for (let entityKey in entities) {
            const spellIndex = entities[entityKey].components.caster.spellcastPending - 1
            entities[entityKey].components.caster.spellcastPending = false
            if (!entities[entityKey].components.spellbook ||
                !entities[entityKey].components.spellbook.value[spellIndex] ||
                !entities[entityKey].components.spellbook.value[spellIndex].behaviors.castable) {
                return console.log(`spell doesn't exist or isn't castable`)
            }
            const spell = entities[entityKey].components.spellbook.value[spellIndex]
            return console.log(`entity ${entityKey} is casting spell ${spell.spellName}`)

        }
    }
}
