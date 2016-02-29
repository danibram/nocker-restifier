export interface nockerConfig {
    method: string
    path: string
    reply: void
}

export interface methodI {
    compose(fn: Function): nockerConfig;
}

export interface RestifierConfig {
    collection: Object;
    url: string;
    only?: string[];
}

export interface Restifier {
    models: RestifierConfig[] | RestifierConfig;
    only?: string[];
    methods: string[];
}
