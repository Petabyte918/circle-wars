import { Injectable } from '@angular/core';
import { EntitiesService } from '../entities/entities.service'
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket

  constructor(
    private entities: EntitiesService
  ) { }
  
  connect() {
    this.socket = io("circlewars.com:80")
    this.socket.on('connect', () => this.entities.setPlayerSocketId(this.socket.id))
    this.socket.on('connectionEntities', e => this.entities.newEntities(e))
    this.socket.on('entities', e =>  this.entities.newEntities(e))
  }

  startUp() {
    this.socket.emit('startUp', true)
  }

  startDown() {
    this.socket.emit('startDown', true)
  }

  startLeft() {
    this.socket.emit('startLeft', true)
  }

  startRight() {
    this.socket.emit('startRight', true)
  }

  endUp() {
    this.socket.emit('endUp', true)
  }

  endDown() {
    this.socket.emit('endDown', true)
  }

  endLeft() {
    this.socket.emit('endLeft', true)
  }

  endRight() {
    this.socket.emit('endRight', true)
  }

}
