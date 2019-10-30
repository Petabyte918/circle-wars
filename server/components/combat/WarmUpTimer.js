import { Timer } from '../generic/Timer'

export class WarmUpTimer extends Timer {
    name = 'warmUpTimer'
    start
    value
    constructor(time) {
        super(time)
    }
}