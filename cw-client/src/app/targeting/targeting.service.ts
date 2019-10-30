import { Injectable } from '@angular/core';
import { EntitiesService } from '../entities/entities.service'

@Injectable({
  providedIn: 'root'
})
export class TargetingService {

  target

  constructor(
    private entities: EntitiesService,
  ) { }

  changeTarget() {
    console.log('changing target')
    const hero = this.entities.entities[this.entities.playerEntityId]
    const targetable = this.entities.pick(e => e.components.targetable && e.id !== hero.id && this.distance(e, hero) < 300)
    Object.values(targetable).forEach(target => console.log(this.targetingHeuristic(hero, target)))
  }

  distance(e1, e2) {
    const a = e1.components.position.x - e2.components.position.x
    const b = e1.components.position.y - e2.components.position.y
    return Math.sqrt(a * a + b * b)
  }

  targetingHeuristic(hero, target) {
    const distance = this.distance(hero, target)
    const distancePortion = distance * (100 / 300)
    const angle = Math.atan2(target.components.position.y - hero.components.position.y, target.components.position.x - hero.components.position.x)
    const diff = Math.abs(hero.components.rotation.value - angle)
    const anglePortion = (diff > Math.PI ? Math.abs(Math.PI * 2 - diff) : diff) * (100 / Math.PI)
    return (anglePortion * 3 + distancePortion)
  }
}