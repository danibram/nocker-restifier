var Rester = require('../dist/nocker-restifier');
module.exports = function(collection, url, opts){
    return new Rester.default(collection, url, opts)
}
