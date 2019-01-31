export class Entity {
    id
    components = {}

    constructor() {
        this.id = (+new Date()).toString(16) + (Math.random() * 100000 | 0).toString(16)
    }

    addComponent(comp) {
        if (comp.components) {
            this.components = { ...this.components, ...comp.components }
        } else {
            this.components[comp.name] = comp
        }
        return this
    }

    removeComponent(compName) {
        delete this.components[compName]
        return this
    }
}