import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  public dirty
  public entities
  public playerSocketId
  public playerEntityId

  constructor() { }

  newEntities(entities) {
    this.dirty = true
    this.deleteDeletedEntities(entities)
    this.entities = {...this.entities, ...entities}
    if (!this.playerEntityId && this.entities) {
      for (let entityId in this.entities) {
        if (this.entities[entityId].components.player && this.entities[entityId].components.player.socketId === this.playerSocketId) {
          this.playerEntityId = entityId
        }
      }
    }
  }

  setPlayerSocketId(id) {
    this.playerSocketId = id
  }

  deleteDeletedEntities(entities) {
    for (let entityId in entities) {
      if (entities[entityId].components.deleted) {
        delete this.entities[entityId]
        delete entities[entityId]
      }
    }
    return entities
  }

  pick(funct) {
    let result = {}
    for (let entityId in this.entities) {
      if (funct(this.entities[entityId])) {
        result[entityId] = this.entities[entityId]
      }
    }
    return result
  }
}
