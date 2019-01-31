export class Acceleration {
    name = 'acceleration'
    x
    y
    norm
    constructor(x, y, norm) {
        this.x = x || 0
        this.y = y || 0
        this.norm = norm || 1
    }
}