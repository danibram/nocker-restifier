export interface nockerConfig {
    method: string
    path: string
    reply: void
}

export type method =  string | 'get' | 'post' | 'put' | 'delete'

export interface methodI<T> {
    new(method: method, config: RestifierConfig): T
    constructor(method: method, config: RestifierConfig): T
    compose(fn: Function): nockerConfig;
    getFn(): Function;
    getUrl(): string;
    getMethod: method
}

export interface options {
    only?: string[];
    refParam?: string;
    mode?: string | "strict" | "normal";
    baseUrl?: string;
    storageProvider?: string | "nedb"
}

export interface RestifierConfig extends options{
    collection: Object;
    resUrl: string;
}

export interface Restifier extends options{
    models: RestifierConfig[] | RestifierConfig;
    defaultOptions: options;
    options: options;
}
