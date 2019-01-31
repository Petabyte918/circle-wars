export class Vectors {
    static magnitude(vector, y) {
        let x
        if (typeof vector === 'number' && typeof y === 'number') {
            x = vector
        }
        if (typeof vector.x === 'number' && typeof vector.y === 'number') {
            x = vector.x
            y = vector.y
        }
        return Math.sqrt(x * x + y * y)
    }

    static angle(vector, y) {
        let x
        if (typeof vector === 'number' && typeof y === 'number') {
            x = vector
        }
        if (typeof vector.x === 'number' && typeof vector.y === 'number') {
            x = vector.x
            y = vector.y
        }
        return Math.atan2(y,x)
    }

    static setMagnitude(vector, y, m) {
        if (typeof vector === 'number' && typeof y === 'number' && typeof m === 'number') {
            return this.polarToCartesian(this.angle(vector,y), m)
        }
        if (typeof vector.x === 'number' && typeof vector.y === 'number' && typeof y === 'number') {
            return {
                ...vector,
                ...this.polarToCartesian(this.angle(vector.x,vector.y), y)
            }
        }
        throw new Error('no magnitude given')
    }

    static setAngle(vector, y, a) {
        if (typeof vector === 'number' && typeof y === 'number' && typeof m === 'number') {
            return this.polarToCartesian(a, this.angle(vector,y))
        }
        if (typeof vector.x === 'number' && typeof vector.y === 'number' && typeof y === 'number') {
            return {
                ...vector,
                ...this.polarToCartesian(y, this.magnitude(vector.x,vector.y))
            }
        }
        throw new Error('no angle given')
    }

    static setPolar(vector, angle, magnitude) {
        return {
            ...vector,
            ...this.polarToCartesian(angle, magnitude)
        }
    }

    static add(vector1, vector2, x2, y2) {
        if (typeof vector1 === 'number' && typeof vector2 === 'number'  && typeof x2 === 'number'  && typeof y2 === 'number') {
            return {x: vector1 + x2, y: vector2 + y2}
        }
        if (typeof vector1.x === 'number' && typeof vector1.y === 'number'  && typeof vector2.x === 'number'  && typeof vector2.y === 'number') {
            return {
                ...vector1,
                x: vector1.x + vector2.x,
                y: vector1.y + vector2.y 
            }
        }
        throw new Error('no two vectors given')
    }

    static mult(vector1, coefficient) {
        return {
            ...vector1,
            ...this.polarToCartesian(this.angle(vector1), this.magnitude(vector1) * coefficient)
        }
    }

    static polarToCartesian(angle, magnitude) {
        return {x: magnitude * Math.cos(angle), y: magnitude * Math.sin(angle)}
    }
}