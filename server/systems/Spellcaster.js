import { pick } from 'underscore'
export class SpellcasterSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.player && e.components.player.spellcastPending)
        for (let entityKey in entities) {
            entities[entityKey].components.player.spellcastPending = false
            if (!entities[entityKey].components.spellbook ||
                !entities[entityKey].components.spellbook[entities[entityKey].components.player.spellcastPending - 1] ||
                !entities[entityKey].components.spellbook[entities[entityKey].components.player.spellcastPending - 1].castable) {
                console.log(entities[entityKey].components.spellbook)
                return console.log(`spell doesn't exist or isn't castable`)
            }

        }
    }
}
