import Method from './Method'
import {methodI, nockerConfig} from '../interfaces'

export default class Get extends Method {

    constructor(private collection: any, private url: string) {
        super('GET', url)
    }

    exec(): nockerConfig {
        return this.compose(this.fn())
    }

    fn(): Function {
        const Collection = this.collection
        return function(params: any, query: any, body:any) {
            Collection.find({})
                .skip(params.skip)
                .limit(params.limit)
                .exec((err: any, results: any) => {
                    this.res.json(results)
                })
        }
    }

}
