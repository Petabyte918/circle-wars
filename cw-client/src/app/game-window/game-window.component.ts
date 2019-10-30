import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service'
import { EntitiesService } from '../entities/entities.service'
import { TargetingService } from '../targeting/targeting.service'
import { PhysicsSystem } from '../../../../dist/systems/Physics'

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
})
export class GameWindowComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef
  private context: CanvasRenderingContext2D
  playerPosition
  playerRotation
  mouseX
  mouseY

  frameCount = 0
  dirtyFrameCount = 0

  private timeLastFrame
  ticLength

  private serverPhysics = new PhysicsSystem()

  private up = false
  private left = false
  private down = false
  private right = false

  constructor(
    private io: WebsocketService,
    private e: EntitiesService,
    private targeter: TargetingService,
  ) {
    console.log('connecting')
    io.connect()
  }

  ngAfterViewInit() {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.context.translate(300, 150)
    this.draw()
  }

  private draw() {
    requestAnimationFrame(() => this.draw())
    this.context.fillStyle = '#666'
    this.context.fillRect(-300, -150, 600, 300)
    if (this.e.entities) {
      this.context.save()

      this.calculateDirtyFrames()
      this.extrapolate()
      this.translateScreenToPlayer(this.e.entities[this.e.playerEntityId])
      this.drawOtherEntities(this.e.entities)
      this.drawPlayer(this.e.entities[this.e.playerEntityId])
      this.e.dirty = false

      this.context.restore()
    }
  }

  private calculateDirtyFrames() {
    if (!this.timeLastFrame) this.timeLastFrame = new Date().getTime()
    this.ticLength = new Date().getTime() - this.timeLastFrame
    this.timeLastFrame = new Date().getTime()

    this.frameCount++
    if (this.e.dirty) {
      this.dirtyFrameCount++
    }
  }

  private extrapolate() {
    if (this.e.dirty) return
    for (let entityId in this.e.entities) {
      this.serverPhysics.physicsExtrapolation(this.e.entities[entityId], this.ticLength, this.e.pick(e => (e.components.collider && !e.components.dynamic)))
    }
  }

  private translateScreenToPlayer(entity) {
    this.playerPosition = entity.components.position
    this.context.translate(-entity.components.position.x, -entity.components.position.y)
  }

  private drawPlayer(entity) {
    this.drawPlayerEntity(entity, '#600', this.playerRotation)
  }

  private drawOtherPlayer(entity) {
    this.drawPlayerEntity(entity, '#060')
  }

  private drawOtherEntities(entities) {
    for (let id in entities) {
      if (id === this.e.playerEntityId) continue
      let entity = entities[id]
      if (entity.components.collider) {
        if (entity.components.collider.type === 'circle') {
          this.drawOtherPlayer(entity)
        } else if (entity.components.collider.type === 'rect') {
          this.drawRect(entity.components.position.x + entity.components.collider.offsetX, entity.components.position.y + entity.components.collider.offsetY, entity.components.collider.width, entity.components.collider.height)
        }
      }
    }
  }

  private drawPlayerEntity(entity, color, rot = undefined) {
    const x = entity.components.position.x + entity.components.collider.offsetX
    const y = entity.components.position.y + entity.components.collider.offsetY
    rot = rot || entity.components.rotation.value
    const rad = entity.components.collider.radius
    this.context.save()
    this.context.translate(x, y)
    this.context.rotate(rot)
    this.drawCircle(0, 0, rad, color)
    this.context.beginPath()
    this.context.moveTo(0, 0)
    this.context.lineTo(rad, 0)
    this.context.lineWidth = 2
    this.context.stroke()
    this.context.restore()
  }

  private drawCircle(x, y, r, c) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI, true);
    this.context.fillStyle = '#faa'
    this.context.fill()

    this.context.lineWidth = 3
    this.context.strokeStyle = c || '#006'
    this.context.stroke()
  }

  private drawRect(x, y, w, h) {
    h = h || w
    this.context.beginPath();
    this.context.rect(x - w / 2, y - h / 2, w, h);
    this.context.fillStyle = '#faa'
    this.context.fill()

    this.context.lineWidth = 3
    this.context.strokeStyle = '#006'
    this.context.stroke()
  }

  keyDown(e) {
    if (e.key === 'Tab') {
      this.targeter.changeTarget()
      e.preventDefault()
    }
    if (e.key === 'w' || e.key === 'ArrowUp') {
      if (!this.up) {
        this.up = true
        this.io.startUp()
      }
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (!this.left) {
        this.left = true
        this.io.startLeft()
      }
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
      if (!this.down) {
        this.down = true
        this.io.startDown()
      }
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (!this.right) {
        this.right = true
        this.io.startRight()
      }
    }
  }

  keyUp(e) {
    if (e.key === 'w' || e.key === 'ArrowUp') {
      if (this.up) {
        this.up = false
        this.io.endUp()
      }
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (this.left) {
        this.left = false
        this.io.endLeft()
      }
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
      if (this.down) {
        this.down = false
        this.io.endDown()
      }
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (this.right) {
        this.right = false
        this.io.endRight()
      }
    }
  }

  mouseMove(event) {
    const canvas = this.canvas.nativeElement
    const x = event.clientX - canvas.offsetLeft
    const y = event.clientY - canvas.offsetTop
    this.mouseX = x - canvas.clientWidth / 2
    this.mouseY = y - canvas.clientHeight / 2
    const oldRotation = this.e.entities[this.e.playerEntityId].components.rotation.value
    const newRotation = Math.atan2(this.mouseY, this.mouseX)
    this.sendRotation(oldRotation, newRotation)
    this.playerRotation = newRotation
  }

  sendRotation(oldRotation, newRotation) {
    if (Math.abs(oldRotation - newRotation) > Math.PI / 10) this.io.rotation(newRotation)
  }

}
