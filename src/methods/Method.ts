import {methodI, nockerConfig} from '../interfaces'

export default class Method implements methodI {
    constructor(private method: string, private path: string) {}

    compose(fn: Function): nockerConfig {
        return Object.assign(
            {},
            {
                method: this.method,
                path: '/' + this.path,
                reply: fn
            }
        )
    }
}
