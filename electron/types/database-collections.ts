import type { Collection } from "lokijs";

/**
 * Collections list for database
 */
type DatabaseCollections<T extends ReadonlyArray<string>> = {
    [K in (T extends ReadonlyArray<infer U> ? U : never)]: Collection
}

export default DatabaseCollections;
