"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Storage_1 = require('./Storage');
var NeDB = (function (_super) {
    __extends(NeDB, _super);
    function NeDB() {
        _super.apply(this, arguments);
    }
    NeDB.prototype.create = function () {
        var Collection = this.Collection;
        return function (params, query, body) {
            var _this = this;
            Collection.insert(body, function (err, results) {
                _this.res.json(results);
            });
        };
    };
    NeDB.prototype.read = function () {
        var Collection = this.Collection;
        return function (params, query, body) {
            var _this = this;
            var q = Collection.find({});
            q = (params.skip) ? q.skip(params.skip) : q;
            q = (params.limit) ? q.limit(params.limit) : q;
            q = (params.sort) ? q.sort(params.sort) : q;
            q.exec(function (err, results) {
                _this.res.json(results);
            });
        };
    };
    NeDB.prototype.readOne = function () {
        var Collection = this.Collection;
        var Q = this.query;
        return function (params, query, body) {
            var _this = this;
            Collection.findOne(Q, function (err, results) {
                _this.res.json(results);
            });
        };
    };
    NeDB.prototype.update = function () {
        var Collection = this.Collection;
        var Q = this.query;
        return function (params, query, body) {
            var _this = this;
            Collection.update(Q, body, {}, function (err, touched) {
                _this.res.json(touched);
            });
        };
    };
    NeDB.prototype.delete = function () {
        var Q = this.query;
        var Collection = this.Collection;
        return function (params, query, body) {
            var _this = this;
            Collection.remove(Q, {}, function (err, touched) {
                _this.res.json(touched);
            });
        };
    };
    return NeDB;
}(Storage_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NeDB;
//# sourceMappingURL=neDB.js.map