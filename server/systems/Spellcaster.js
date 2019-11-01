import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.caster && (e.components.caster.spellKeyDown || e.components.caster.spellKeyUp))
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            if (entity.components.caster.spellKeyDown) {
                if (entity.components.spellbook.value[entity.components.caster.spellKeyDown - 1].events.onKeyDown) {
                    console.log(`handle actions ${entity.components.spellbook.value[entity.components.caster.spellKeyDown].events.onKeyDown}`)
                    entity.components.caster.spellKeyDown = false
                }
            }
            if (entity.components.caster.spellKeyUp) {
                if (entity.components.spellbook.value[entity.components.caster.spellKeyUp - 1].events.onKeyUp) {
                    console.log(`handle actions ${entity.components.spellbook.value[entity.components.caster.spellKeyUp].events.onKeyUp}`)
                    entity.components.caster.spellKeyUp = false
                }
            }
        }
    }
}
