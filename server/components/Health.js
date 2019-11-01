export class Health {
    name = 'health'
    value
    currentHealth
    regen
    constructor(hp) {
        this.value = hp
        this.currentHealth = hp
        this.regen = hp / 1000
    }

}