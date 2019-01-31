'use strict';

var _Hero = require('./Hero');

var _Player = require('./components/Player');

var _Physics = require('./systems/Physics');

var _EntityBroadcast = require('./systems/EntityBroadcast');

var _Vectors = require('./Vectors');

var _Entity = require('./Entity');

var _Name = require('./components/Name');

var _Position = require('./components/physics/Position');

var _Collider = require('./components/physics/Collider');

var _Physics2 = require('./components/physics/Physics');

var _Health = require('./components/Health');

var _Dynamic = require('./components/Dynamic');

var _Deleted = require('./components/Deleted');

var _Incoming = require('./Incoming');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ticLength = 25;

var entities = {};
var systems = [new _Physics.PhysicsSystem(ticLength), new _EntityBroadcast.EntityBroadcastSystem(io)];

app.use(express.static('/home/ubuntu/dev/cw-client/dist/cw-client'));

io.on('connection', playerConnect);

http.listen(80, function () {
    console.log('You are now running Circle Wars!');
});

//test code to add a static entity
var staticEntity = new _Entity.Entity().addComponent(new _Position.Position(-50, -50)).addComponent(new _Collider.Collider('rect'));
entities[staticEntity.id] = staticEntity;

function playerConnect(socket) {
    var hero = new _Hero.Hero('All Might').addComponent(new _Player.Player(socket.id));

    console.log('a user connected', hero.id);

    entities[hero.id] = hero;
    socket.emit('connectionEntities', entities);

    new _Incoming.Incoming(socket, hero, entities);

    socket.on('disconnect', function (reason) {
        hero.addComponent(new _Deleted.Deleted());
        console.log(hero.components.name.value, 'disconnected');
    });
}

function step() {
    for (var i = 0; i < systems.length; i++) {
        systems[i].step(entities);
    }
}

setInterval(step, ticLength);
//# sourceMappingURL=index.js.map