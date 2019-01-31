export class Collider {
    name = 'collider'
    type // 'rect' or 'circle'
    offsetX
    offsetY
    constructor(type, offsetX, offsetY, radius = 10, height) {
        this.type = type || height ? 'rect' : 'circle'
        this.offsetX = offsetX || 0
        this.offsetY = offsetY || 0
        if (this.type === 'circle')
            this.radius = radius
        if (this.type === 'rect') {
            this.width = radius * 2
            if (typeof height === 'undefined')
                this.height = this.width
        }
    }
}