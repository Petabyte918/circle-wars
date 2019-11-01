import { Hero } from './prefabs/Hero'
import { Player } from './components/Player'
import { Entity } from './Entity'
import { Position } from './components/physics/Position'
import { Collider } from './components/physics/Collider'
import { Deleted } from './components/Deleted'

import { FrostBolt } from './prefabs/spells/FrostBolt'
import { Spellbook } from './components/combat/spells/Spellbook'

import { Timer } from './components/generic/Timer'
import { WarmUpTimer } from './components/combat/WarmUpTimer'

import { Incoming } from './Incoming'

import { TimerSystem } from './systems/Timer'
import { PhysicsSystem } from './systems/Physics'
import { EntityBroadcastSystem } from './systems/EntityBroadcast'
import { SpellcasterSystem } from './systems/Spellcaster'
import { ProjectilesSystem } from './systems/Projectiles'
import { HealthSystem } from './systems/Health'

const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const ticLength = 25

const entities = {}
const systems = [
    new PhysicsSystem(ticLength),
    new EntityBroadcastSystem(io),
    new TimerSystem(ticLength),
    new SpellcasterSystem(),
    new ProjectilesSystem(),
    new HealthSystem(ticLength),
]

app.use(express.static('/home/ubuntu/dev/cw-client/dist/cw-client'))

io.on('connection', playerConnect)

http.listen(80, function () {
    console.log('You are now running Circle Wars!');
});

//test code to add a static entity
const staticEntity = new Entity()
    .addComponent(new Position(-50, -50))
    .addComponent(new Collider('rect'))
    .addComponent(new Timer(2000))
    .addComponent(new WarmUpTimer(2000))
addEntity(staticEntity)

function addEntity(entity) {
    entities[entity.id] = entity
}

function playerConnect(socket) {
    const hero = new Hero('All Might')
        .addComponent(new Player(socket.id))
        .addComponent(new Spellbook([new FrostBolt()]))

    console.log('a user connected', hero.id)

    addEntity(hero)
    socket.emit('connectionEntities', entities)

    new Incoming(socket, hero, entities)

    socket.on('disconnect', reason => {
        hero.addComponent(new Deleted())
        console.log(hero.components.name.value, 'disconnected')
    })
}

function step() {
    for (let i = 0; i < systems.length; i++) {
        systems[i].step(entities)
    }
}

setInterval(step, ticLength)