import Method from './methods/Method'
import GET from './methods/Get'
import POST from './methods/Post'
import PUT from './methods/Put'
import DELETE from './methods/Delete'
import {RestifierConfig, nockerConfig, Restifier} from './interfaces'



export default class rester implements Restifier {
    methods = ['get', 'post', 'put', 'delete']

    constructor(public models: RestifierConfig[] | RestifierConfig, public only?:string[]) {
        let routes = <nockerConfig[]>[]
        if (Array.isArray(models)){
            models.map((m: RestifierConfig) => {
                let methods = (this.only) ? only : (m.only) ? m.only : this.methods;
                let newRoutes = this.generateMethods(methods, m)
                routes = routes.concat(newRoutes)
            })
        } else {
            let methods = (this.only) ? this.only : this.methods;
            routes = this.generateMethods(methods, models)
        }
        return <any>routes
    }

    generateMethods(methods: string[], methodConfig: RestifierConfig): nockerConfig[] {
        return methods.map((methodName)=>{
            return this.selectMethod(methodName, methodConfig)
        })
    }

    selectMethod(method: string, methodConfig: RestifierConfig): nockerConfig {
        switch (method){
            case 'get':
                return new GET(methodConfig.collection, methodConfig.url).exec()
            case 'post':
                return new POST(methodConfig.collection, methodConfig.url).exec()
            case 'put':
                return new PUT(methodConfig.collection, methodConfig.url).exec()
            case 'delete':
                return new DELETE(methodConfig.collection, methodConfig.url).exec()
        }
    }
}
