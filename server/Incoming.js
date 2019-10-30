import {Vectors} from './Vectors'

export class Incoming {

    constructor(socket, hero, entities) {
        this.socket = socket
        this.hero = hero

        this.directions(socket, hero)
    }

    directions(socket, hero) {
        socket.on('rotation', rotation => {
            hero.components.rotation.value = rotation
            hero.components.dynamic.dirty = true
        })

        socket.on('startUp', () => {
            hero.components.player.up = true
            calculateAcceleration()
        })
        socket.on('startDown', () => {
            hero.components.player.down = true
            calculateAcceleration()
        })
        socket.on('startLeft', () => {
            hero.components.player.left = true
            calculateAcceleration()
        })
        socket.on('startRight', () => {
            hero.components.player.right = true
            calculateAcceleration()
        })
        socket.on('endUp', () => {
            hero.components.player.up = false
            calculateAcceleration()
        })
        socket.on('endDown', () => {
            hero.components.player.down = false
            calculateAcceleration()
        })
        socket.on('endLeft', () => {
            hero.components.player.left = false
            calculateAcceleration()
        })
        socket.on('endRight', () => {
            hero.components.player.right = false
            calculateAcceleration()
        })

        function calculateAcceleration() {
            const up = hero.components.player.up
            const down = hero.components.player.down
            const left = hero.components.player.left
            const right = hero.components.player.right

            if (up) {
                if (down) {
                    if (left) {
                        if (right) {
                            hero.components.acceleration.x = 0
                            hero.components.acceleration.y = 0
                        } else {
                            hero.components.acceleration.x = -hero.components.acceleration.norm
                            hero.components.acceleration.y = 0
                        }
                    } else if (right) {
                        hero.components.acceleration.x = hero.components.acceleration.norm
                        hero.components.acceleration.y = 0
                    } else {
                        hero.components.acceleration.x = 0
                        hero.components.acceleration.y = 0
                    }
                } else if (left) {
                    if (right) {
                        hero.components.acceleration.x = 0
                        hero.components.acceleration.y = -hero.components.acceleration.norm
                    } else {
                        hero.components.acceleration = Vectors.setPolar(hero.components.acceleration, -Math.PI * 3 / 4, hero.components.acceleration.norm)
                    }
                } else if (right) {
                    hero.components.acceleration = Vectors.setPolar(hero.components.acceleration, -Math.PI * 1 / 4, hero.components.acceleration.norm)
                } else {
                    hero.components.acceleration.x = 0
                    hero.components.acceleration.y = -hero.components.acceleration.norm
                }
            } else if (down) {
                if (left) {
                    if (right) {
                        hero.components.acceleration.x = 0
                        hero.components.acceleration.y = hero.components.acceleration.norm
                    } else {
                        hero.components.acceleration = Vectors.setPolar(hero.components.acceleration, Math.PI * 3 / 4, hero.components.acceleration.norm)
                    }
                } else if (right) {
                    hero.components.acceleration = Vectors.setPolar(hero.components.acceleration, Math.PI * 1 / 4, hero.components.acceleration.norm)
                } else {
                    hero.components.acceleration.x = 0
                    hero.components.acceleration.y = hero.components.acceleration.norm
                }
            } else if (left) {
                if (right) {
                    hero.components.acceleration.x = 0
                    hero.components.acceleration.y = 0
                } else {
                    hero.components.acceleration.x = -hero.components.acceleration.norm
                    hero.components.acceleration.y = 0
                }
            } else if (right) {
                hero.components.acceleration.x = hero.components.acceleration.norm
                hero.components.acceleration.y = 0
            } else {
                hero.components.acceleration.x = 0
                hero.components.acceleration.y = 0
            }
        }
    }
}