import Method from './Method'
import {methodI, nockerConfig} from '../interfaces'

export default class Post extends Method {

    constructor(private collection: any, private url: string, private refParam?: string) {
        super('DELETE', url)
    }

    exec(): nockerConfig {
        return this.compose(this.fn())
    }

    fn(): Function{
        const Collection = this.collection
        return function(params: any, query: any, body:any) {
            let refParam = (this.refParam) ? this.refParam : '_id';
            let queryDB:any = {}
            queryDB[refParam] = params[refParam]
            Collection.remove(queryDB, (err: any, touched: any) => {

                this.res.json(touched)
            })
        }
    }

}
