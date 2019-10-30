export class Spell {
    name = 'spell'
    spellName
    castable
    constructor(name, castable) {
        this.spellName = name
        this.castable = castable
    }
}