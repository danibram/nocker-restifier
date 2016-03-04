"use strict";
var Storage = (function () {
    function Storage(Collection, query) {
        this.Collection = Collection;
        this.query = query;
        if (typeof this.create != "function" || typeof this.read != "function" || typeof this.update != "function" || typeof this.delete != "function")
            throw Error("Storage not implemented");
    }
    Storage.prototype.create = function () { };
    Storage.prototype.read = function () { };
    Storage.prototype.readOne = function () { };
    Storage.prototype.update = function () { };
    Storage.prototype.delete = function () { };
    Storage.prototype.deleteAll = function () { };
    return Storage;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Storage;
//# sourceMappingURL=Storage.js.map