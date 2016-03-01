export default class Storage {
    constructor(public Collection: any, public query?: Object) {
        if (typeof this.create != "function" || typeof this.read != "function" || typeof this.update != "function" || typeof this.delete != "function")
            throw Error("Storage not implemented")
    }

    create(){}
    read(){}
    readOne(){}
    update(){}
    delete(){}
    deleteAll(){}
}
