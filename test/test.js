var nockerRestifier = require('../lib');
var Nocker = require('nocker');
var path = require('path');
var NEDB = require('nedb')

// Init DB
var db = {
    tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
}

//Restifier
//var nockerResources = nockerRestifier({collection: db.tags, resUrl: 'tags'})

//var nockerResources = nockerRestifier({collection: db.tags, resUrl: 'tags'}, {mode: 'normal'})

var nockerResources = nockerRestifier({collection: db.tags, resUrl: 'tags'}, {refParam: 'youAwesomeId'})



Nocker.register(nockerResources);
// Start server on port 7003
Nocker.start({port: 9999, auth: false}, function() {
  console.log("Server is listening on port " + this.port + '\n');
})
