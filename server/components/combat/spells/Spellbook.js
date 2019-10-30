import { Spell } from './Spell'

export class Spellbook {
    name = 'spellbook'
    value = []
    constructor(spells) {
        if (Array.isArray(spells) && spells[0] instanceof Spell) {
            this.value = spells
        }
    }
}