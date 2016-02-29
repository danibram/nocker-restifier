import Method from './Method'
import {methodI, nockerConfig} from '../interfaces'

export default class Put extends Method {

    constructor(private collection: any, private url: string) {
        super('PUT', url + '/:id')
    }

    exec(): nockerConfig {
        return this.compose(this.fn())
    }

    fn(): Function {
        const Collection = this.collection
        return function(params: any, query: any, body:any) {
            Collection.insert({ id: params.id }, body)
                .exec((err: any, touched: any) => {
                    this.res.json(touched)
                })
        }
    }

}
