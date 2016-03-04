"use strict";
var Method_1 = require('./Method');
var rester = (function () {
    function rester(models, options) {
        var _this = this;
        this.models = models;
        this.options = options;
        this.defaultOptions = {
            only: ['get', 'getOne', 'post', 'put', 'delete'],
            refParam: '_id',
            mode: 'strict',
            storageProvider: 'nedb'
        };
        var routes = [];
        this.options = (this.options) ?
            Object.assign({}, this.defaultOptions, this.options)
            : Object.assign({}, this.defaultOptions);
        if (Array.isArray(models)) {
            models.map(function (m) {
                routes = routes.concat(_this.buildMethods(m));
            });
        }
        else {
            routes = this.buildMethods(models);
        }
        return routes;
    }
    rester.prototype.buildMethods = function (methodConfig) {
        var methods = (this.options.only) ? this.options.only : (methodConfig.only) ? methodConfig.only : this.defaultOptions.only;
        var cfg = Object.assign({}, this.options, methodConfig);
        return methods.map(function (method) {
            var methodInstance = new Method_1.default(method, cfg);
            return methodInstance.generate();
        });
    };
    return rester;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rester;
//# sourceMappingURL=nocker-restifier.js.map