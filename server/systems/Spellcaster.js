import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.caster && (e.components.caster.spellKeyDown || e.components.caster.spellKeyUp))
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            console.log(entity.components.caster.spellKeyDown, entity.components.caster.spellKeyUp)
            if (entity.components.caster.spellKeyDown) {
                if (entity.components.spellbook.value[entity.components.caster.spellKeyDown].events.onKeyDown) {
                    console.log(`handle actions ${entity.components.spellbook.value[entity.components.caster.spellKeyDown].events.onKeyDown}`)
                    entity.components.caster.spellKeyDown = false
                }
            }
            if (entity.components.caster.spellKeyUp) {
                if (entity.components.spellbook.value[entity.components.caster.spellKeyUp].events.onKeyUp) {
                    console.log(`handle actions ${entity.components.spellbook.value[entity.components.caster.spellKeyUp].events.onKeyUp}`)
                    entity.components.caster.spellKeyUp = false
                }
            }
        }
    }
}
