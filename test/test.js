var rester = require('../lib');
var Nocker = require('nocker');
var path = require('path');
var NEDB = require('nedb')

var db = {
    tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
}

var nockerResources = rester({collection: db.tags, resUrl: 'tags'})
Nocker.register(nockerResources);

// Start server on port 7003
Nocker.start({port: 9999, auth: false}, function() {
  console.log("Server is listening on port " + this.port + '\n');
})
