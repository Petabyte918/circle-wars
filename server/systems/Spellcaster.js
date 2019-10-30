import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.player && e.components.player.spellcastPending)
        for (let entityKey in entities) {
            console.log(`${entityKey} casts spell: ${entities[entityKey].components.player.spellcastPending}`)
            entities[entityKey].components.player.spellcastPending = false
        }
    }
}
