import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.caster && (e.components.caster.spellKeyDown || e.components.caster.spellKeyUp))
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            if (entity.components.caster.spellKeyDown) {
                const spellIndex = entity.components.caster.spellKeyDown - 1
                entities[entityKey].components.caster.spellKeyDown = false
                if (!entity.components.spellbook.value[spellIndex]) return
                if (entity.components.spellbook.value[spellIndex].events.onKeyDown) {
                    console.log(`handle actions ${entity.components.spellbook.value[spellIndex].events.onKeyDown}`)
                }
            }
            if (entity.components.caster.spellKeyUp) {
                const spellIndex = entity.components.caster.spellKeyUp - 1
                entities[entityKey].components.caster.spellKeyUp = false
                if (!entity.components.spellbook.value[spellIndex]) return
                if (entity.components.spellbook.value[spellIndex].events.onKeyUp) {
                    console.log(`handle actions ${entity.components.spellbook.value[spellIndex].events.onKeyUp}`)
                }
            }
        }
    }
}
