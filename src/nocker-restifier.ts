import Method from './Method'

import {RestifierConfig, nockerConfig, Restifier, options} from './interfaces'



export default class rester implements Restifier {
    defaultOptions = {
        only: ['get', 'getOne', 'post', 'put', 'delete'],
        refParam : '_id',
        mode: 'strict',
        storageProvider: 'nedb'
    }

    constructor(public models: RestifierConfig[] | RestifierConfig, public options?:options) {
        let routes = <nockerConfig[]>[]

        this.options = (this.options) ?
            Object.assign({}, this.defaultOptions, this.options)
            : Object.assign({}, this.defaultOptions)

        if (Array.isArray(models)){
            models.map((m: RestifierConfig) => {
                routes = routes.concat(this.buildMethods(m))
            })
        } else {
            routes = this.buildMethods(models)
        }

        return <any>routes
    }

    buildMethods(methodConfig: RestifierConfig): nockerConfig[] {
        let methods = (this.options.only) ? this.options.only : (methodConfig.only) ? methodConfig.only : this.defaultOptions.only;
        let cfg = Object.assign({}, this.options, methodConfig)

        return methods.map((method)=>{
            let methodInstance = new Method(method, cfg)
            return methodInstance.generate()
        })
    }
}
