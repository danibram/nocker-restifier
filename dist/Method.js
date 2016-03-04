"use strict";
var neDB_1 = require('./storageProviders/neDB');
var Method = (function () {
    function Method(method, config) {
        this.method = method;
        this.config = config;
    }
    Method.prototype.generate = function () {
        return Object.assign({}, {
            method: this.getMethod(),
            path: this.getUrl(),
            reply: this.getFn()
        });
    };
    Method.prototype.getFn = function () {
        var fn;
        var DB = new neDB_1.default(this.config.collection);
        switch (this.method) {
            case 'delete':
                return DB.delete();
            case 'put':
                return DB.update();
            case 'get':
                return DB.read();
            case 'getOne':
                return DB.readOne();
            case 'post':
                return DB.create();
            default:
                return function () { };
        }
    };
    Method.prototype.getMethod = function () {
        var method = this.method;
        switch (this.method) {
            case 'delete':
            case 'put':
                method = (this.config.mode === 'strict') ? 'post' : method;
                break;
            case 'getOne':
                method = 'get';
                break;
            case 'get':
            case 'post':
            default:
                break;
        }
        return method;
    };
    Method.prototype.getUrl = function () {
        var refParam = (this.config.refParam) ? this.config.refParam : '_id';
        var resUrl = this.config.resUrl;
        var baseUrl = (this.config.baseUrl) ? this.config.baseUrl : '';
        var url = (baseUrl) ? '/' + baseUrl : '/';
        url += resUrl;
        switch (this.method) {
            case 'delete':
            case 'put':
                var m = (this.method === 'put') ? 'update' : this.method;
                url += (this.config.mode === 'strict') ?
                    '/:' + refParam + '/' + m
                    :
                        '/:' + refParam;
                break;
            case 'getOne':
                url += '/:' + refParam;
                break;
            case 'get':
            case 'post':
            default:
                break;
        }
        return url;
    };
    return Method;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Method;
//# sourceMappingURL=Method.js.map