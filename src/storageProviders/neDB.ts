import Storage from './Storage';

export default class NeDB extends Storage {
    create(){
        const Collection = this.Collection
        return function(params: any, query: any, body:any) {
            Collection.insert(body, (err: any, results: any) => {
                this.res.json(results)
            })
        }
    }
    read(){
        const Collection = this.Collection
        return function(params: any, query: any, body:any) {
            var q = Collection.find({})
            q = (params.skip) ? q.skip(params.skip) : q
            q = (params.limit) ? q.limit(params.limit) : q
            q = (params.sort) ? q.sort(params.sort) : q

            q.exec((err: any, results: any) => {
                this.res.json(results)
            })
        }
    }
    readOne(){
        const Collection = this.Collection
        const Q = this.query

        return function(params: any, query: any, body:any) {
            Collection.findOne(Q, (err: any, results: any) => {
                this.res.json(results)
            })
        }
    }
    update(){
        const Collection = this.Collection
        const Q = this.query

        return function(params: any, query: any, body:any) {
            Collection.update(Q, body, {}, (err: any, touched: any) => {
                this.res.json(touched)
            })
        }
    }
    delete(){
        const Q = this.query
        const Collection = this.Collection

        return function(params: any, query: any, body:any) {
            Collection.remove(Q, {}, (err: any, touched: any) => {
                this.res.json(touched)
            })
        }
    }
}
