import { CastTimeBehavior } from "../../components/combat/spells/behaviors/CastTime"

export class FrostBolt extends Spell {
    constructor() {
        super("Frost Bolt", true)
        this.addBehavior(new CastTimeBehavior(2000))
    }
}