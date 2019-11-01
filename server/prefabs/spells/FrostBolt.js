import { OnKeyDown } from "../../components/combat/spells/events/OnKeyDown"
import { BeginCasting } from "../../components/combat/spells/actions/BeginCasting"
import { OnFinishCasting } from "../../components/combat/spells/events/OnFinishCasting"

export class FrostBolt extends Spell {
    constructor() {
        super("Frost Bolt")
        this.addEvent(new OnKeyDown(new BeginCasting(2000)))
            .addEvent(new OnFinishCasting(new CreateProjectile(2)))
    }
}