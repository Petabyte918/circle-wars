import { Spell } from "../../components/combat/spells/Spell"
import { OnKeyDown } from "../../components/combat/spells/events/OnKeyDown"
import { OnFinishCasting } from "../../components/combat/spells/events/OnFinishCasting"
import { BeginCasting } from "../../components/combat/spells/actions/BeginCasting"
import { CreateProjectile } from "../../components/combat/spells/actions/CreateProjectile"

export class FrostBolt extends Spell {
    constructor() {
        super("Frost Bolt", 10)
        this.addEvent(new OnKeyDown([new ChargeMana(this.manaCost), new BeginCasting(2000)]))
            .addEvent(new OnFinishCasting(new CreateProjectile(2)))
    }
}