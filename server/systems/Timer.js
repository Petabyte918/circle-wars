<<<<<<< HEAD
import { pick, reject } from 'underscore'
export class TimerSystem {
    tickLength
    constructor(tickLength) {
        this.tickLength = tickLength
    }
    step(_entities) {
        const entities = pick(_entities, e => e.components.timers && e.components.timers.value.length > 0)
        for (let entityKey in entities) {
            entities[entityKey].components.timers.value = reject(entities[entityKey].components.timers.value, timer => {
                timer.value -= this.tickLength
                if (timer.value < 0) {
                    return true
                }
                return false
            })
        }
    }
}
=======
import { pick, reject } from 'underscore'
export class TimerSystem {
    tickLength
    constructor(tickLength) {
        this.tickLength = tickLength
    }
    step(_entities) {
        const entities = pick(_entities, e => e.components.timers && e.components.timers.value.length > 0)
        for (let entityKey in entities) {
            entities[entityKey].components.timers.value = reject(entities[entityKey].components.timers.value, timer => {
                timer.value -= this.tickLength
                if (timer.value < 0) {
                    return true
                }
                return false
            })
        }
    }
}
>>>>>>> 7e5b736f85d4a373a4c5e052b5ddce682d9adfb8
