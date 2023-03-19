import { writable, type Writable } from "svelte/store";

/** Custom store type */
interface StoreType<T> extends Writable<T> {
    get value(): T;
}

/** Generate store with value getter */
export default function createStore<T>(init?: T): StoreType<T> {
    const _s = writable<T>(init);
    
    // Subscribe
    let _v: T;
    _s.subscribe(v => (_v = v));

    return {
        ..._s,
        get value() {
            return _v;
        }
    };
}
