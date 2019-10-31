import { pick } from 'underscore'
export class ProjectilesSystem {
    constructor() { }
    step(_entities) {
        const entities = pick(_entities, e => e.components.type && e.components.type.value === 'projectile')
        //entities.forEach(projectile => {
        //const velocity = 
        //})
    }
}
