import {Hero} from './Hero'
import {Player} from './components/Player'
import {PhysicsSystem} from './systems/Physics'
import {EntityBroadcastSystem} from './systems/EntityBroadcast'
import {Vectors} from './Vectors'
import {Entity} from './Entity'
import {Name} from './components/Name'
import {Position} from './components/physics/Position'
import {Collider} from './components/physics/Collider'
import {Physics} from './components/physics/Physics'
import {Health} from './components/Health'
import {Dynamic} from './components/Dynamic'
import {Deleted} from './components/Deleted'

import {Incoming} from './Incoming'

const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const ticLength = 25

const entities = {}
const systems = [new PhysicsSystem(ticLength), new EntityBroadcastSystem(io)]

app.use(express.static('/home/ubuntu/dev/cw-client/dist/cw-client'))

io.on('connection', playerConnect)

http.listen(80, function() {
    console.log('You are now running Circle Wars!');
});

//test code to add a static entity
const staticEntity = new Entity()
    .addComponent(new Position(-50,-50))
    .addComponent(new Collider('rect'))
entities[staticEntity.id] = staticEntity


function playerConnect(socket) {
    const hero = new Hero('All Might')
        .addComponent(new Player(socket.id))
    
    console.log('a user connected', hero.id)
    
    entities[hero.id] = hero
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