export interface nockerConfig {
    method: string
    path: string
    reply: void
}

export interface methodI {
    compose(fn: Function): nockerConfig;
}

export interface options{
    only?: string[];
    refParam?: string;
}

export interface RestifierConfig extends options{
    collection: Object;
    url: string;
}

export interface Restifier extends options{
    models: RestifierConfig[] | RestifierConfig;
    methods: string[];
}
