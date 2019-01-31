import { pick } from 'underscore'
export class EntityBroadcastSystem {
    io
    constructor(io) {
        this.io = io
    }
    step(_entities) {
        const entities = pick(_entities, e => (e.components.dynamic && e.components.dynamic.dirty === true) || e.components.deleted)
        this.io.emit('entities', entities)
        for (let entityId in entities) {
            if (entities[entityId].components.dynamic)
                entities[entityId].components.dynamic.dirty = false
            if (entities[entityId].components.deleted) {
                console.log('deleting', entityId)
                delete _entities[entityId]
            }
        }
    }
}
