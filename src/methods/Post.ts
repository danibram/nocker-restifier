import Method from './Method'
import {methodI, nockerConfig} from '../interfaces'

export default class Post extends Method {

    constructor(private collection: any, private url: string) {
        super('POST', url)
    }

    exec(): nockerConfig {
        return this.compose(this.fn())
    }

    fn(): Function{
        const Collection = this.collection
        return function(params: any, query: any, body:any) {
            console.log(body)
            Collection.insert(body, (err: any, results: any) => {
                this.res.json(results)
            })
        }
    }
}
