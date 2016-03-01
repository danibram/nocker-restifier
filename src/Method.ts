import {RestifierConfig, method, nockerConfig} from './interfaces'
import nedb from './storageProviders/neDB';

export default class Method {
    constructor(private method: method, private config: RestifierConfig) {}

    generate(): nockerConfig {
        return Object.assign(
            {},
            {
                method: this.getMethod(),
                path: this.getUrl(),
                reply: this.getFn()
            }
        )
    }

    getFn(){
        let fn:any
        let DB = new nedb(this.config.collection)

        switch (this.method){
            case 'delete':
                return DB.delete()
            case 'put':
                return DB.update()
            case 'get':
                return DB.read()
            case 'getOne':
                return DB.readOne()
            case 'post':
                return DB.create()
            default:
                return ()=>{}

        }
    }
    getMethod(){
        let method = this.method

        switch (this.method){
            case 'delete':
            case 'put':
                method = (this.config.mode === 'strict') ? 'post' : method
                break;
            case 'getOne':
                method = 'get'
                break;
            case 'get':
            case 'post':
            default:
                break;

        }
        return method
    }

    getUrl () {
        let refParam = (this.config.refParam) ? this.config.refParam : '_id'
        let resUrl = this.config.resUrl
        let baseUrl = (this.config.baseUrl) ? this.config.baseUrl : ''
        let url = (baseUrl) ? '/' + baseUrl : '/'
        url += resUrl

        switch (this.method){
            case 'delete':
            case 'put':
                let m = (this.method === 'put') ? 'update' : this.method
                url += (this.config.mode === 'strict') ?
                    '/:' + refParam + '/' + m
                :
                    '/:' + refParam
                break;
            case 'getOne':
                url += '/:' + refParam
                break;
            case 'get':
            case 'post':
            default:
                break;

        }
        return url
    }


}
