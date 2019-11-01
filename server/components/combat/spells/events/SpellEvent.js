export class SpellEvent {
    name = 'event'
    actions = []
    constructor(actions) {
        this.actions = this.actions.concat(actions)
    }
}