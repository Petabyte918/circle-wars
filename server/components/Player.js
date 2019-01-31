export class Player {
    name = 'player'
    socketId
    up = false
    down = false
    left = false
    right = false
    constructor(id) {
        this.socketId = id
    }
}