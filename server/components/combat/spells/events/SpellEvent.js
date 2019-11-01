export class SpellEvent {
    name = 'event'
    actions = []
    constructor(actions) {
        if (!Array.isArray(actions)) return this.actions.push(actions)
        this.actions.concat(actions)
    }
}