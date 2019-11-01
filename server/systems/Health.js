import { pick } from 'underscore'
export class HealthSystem {
    ticLength

    constructor(ticLength) {
        this.ticLength = ticLength || 25
    }

    step(_entities) {
        const entities = pick(_entities, e => e.components.health && e.components.health.currentHealth !== e.components.health.value)
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            if (entity.components.health.currentHealth <= 0) {
                return this.die(entity)
            }
            entity.components.health.currentHealth += entity.components.health.regen
            entity.components.dynamic.dirty = true
        }
    }

    die(entity) {
        entity.components.accelaration.x = 0
        entity.components.accelaration.y = 0
        entity.components.velocity.x = 0
        entity.components.velocity.y = 0
        entity.components.position.x = 0
        entity.components.position.y = 0
        entity.components.health.currentHealth = entity.components.health.value
        entity.components.mana.currentMana = entity.components.mana.value
        entity.components.dynamic.dirty = true
    }
}
