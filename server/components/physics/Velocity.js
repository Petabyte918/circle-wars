export class Velocity {
    name = 'velocity'
    x
    y
    max
    constructor(x, y, max) {
        this.x = x || 0
        this.y = y || 0
        this.max = max || 5
    }
}