import { pick } from 'underscore'
import { Vectors } from '../Vectors'
export class SpellcasterSystem {
    ticLength

    constructor(ticLength) {
        this.ticLength = ticLength || 25
    }

    step(_entities) {
        const entities = pick(_entities, e => e.components.caster && (e.components.caster.spellKeyDown || e.components.caster.spellKeyUp))
        for (let entityKey in entities) {
            const entity = entities[entityKey]
            if (entity.components.caster.spellKeyDown) {
                const spellIndex = entity.components.caster.spellKeyDown - 1
                entity.components.caster.spellKeyDown = false
                if (!entity.components.spellbook.value[spellIndex]) return
                if (entity.components.spellbook.value[spellIndex].events.onKeyDown) {
                    if (Vectors.magnitude(entity.components.acceleration) > 0) return
                    if (entity.components.mana.currentMana < entity.components.spellbook.value[spellIndex].manaCost) return
                    this.handleActions(entity, spellIndex, entity.components.spellbook.value[spellIndex].events.onKeyDown.actions)
                }
            }
            if (entity.components.caster.spellKeyUp) {
                const spellIndex = entity.components.caster.spellKeyUp - 1
                entity.components.caster.spellKeyUp = false
                if (!entity.components.spellbook.value[spellIndex]) return
                if (entity.components.spellbook.value[spellIndex].events.onKeyUp) {
                    this.handleActions(entity, spellIndex, entity.components.spellbook.value[spellIndex].events.onKeyUp.actions)
                }
            }
        }
        const castingEntities = pick(_entities, e => e.components.caster && (e.components.caster.casting !== false))
        for (let entityKey in castingEntities) {
            const entity = castingEntities[entityKey]
            if (entity.components.caster.castTimeRemaining <= 0) {
                if (entity.components.spellbook.value[entity.components.caster.casting].events.onFinishCasting) {
                    this.handleActions(entity, entity.components.caster.casting, entity.components.spellbook.value[entity.components.caster.casting].events.onFinishCasting.actions)
                    console.log(`finished casting ${entity.components.spellbook.value[entity.components.caster.casting].spellName}`)
                }
                entity.components.caster.casting = false
                entity.components.caster.castTimeRemaining = 0
                entity.components.caster.castTime = 0
                return
            }
            entity.components.caster.castTimeRemaining -= this.ticLength
        }
    }

    handleActions(entity, spellIndex, actions) {
        actions.forEach(a => {
            if (a.name === 'beginCasting') this.beginCasting(entity, spellIndex, a)
            if (a.name === 'createProjectile') this.createProjectile(entity, spellIndex, a)
            if (a.name === 'chargeMana') this.chargeMana(entity, spellIndex, a)
        })
    }

    beginCasting(entity, spellIndex, action) {
        entity.components.dynamic.dirty = true
        entity.components.caster.casting = spellIndex
        entity.components.caster.castTimeRemaining = action.castTime
        entity.components.caster.castTime = action.castTime
    }

    chargeMana(entity, spellIndex, action) {
        entity.components.mana.currentMana -= action.value
        entity.components.dynamic.dirty = true
    }

    createProjectile(entity, spellIndex, action) {

    }
}
