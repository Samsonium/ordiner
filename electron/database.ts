import Loki from 'lokijs';
import DatabaseCollections from './types/database-collections';

type DBCollections = DatabaseCollections<typeof Database.collectionNames>;

/** Loki database wrapper */
class Database {
    private static _instance: Database;

    /**
     * Database collections names
     */
    public static readonly collectionNames: string[] = [
        'projects', 'calendar', 'customers', 
        'products', 'tasks',    'settings'
    ];

    /**
     * Database instance
     */
    private readonly db: Loki;

    private collections: DBCollections;
    
    /**
     * Make db wrapper instance
     */
    private constructor() {
        this.db = new Loki('db.odnr', {
            verbose: true,
            autosave: true,
            autosaveInterval: 5000,
            autoload: true
        });
    }

    /**
     * Load database collections
     */
    public loadCollections(): void {
        this.collections ??= {};

        // Iterate over collection names and load or create it
        for (const cName of Database.collectionNames) {
            const collection = this.db.getCollection(cName);
            if (collection) {
                this.db.loadCollection(collection);
                this.collections[cName] = collection;
            } else this.collections[cName] = this.db.addCollection(cName);
        }
    }

    /**
     * Close database normally
     */
    public close(): void {
        this.db.close();
    }

    /**
     * Getter for collections
     */
    public get collection(): DBCollections {
        return this.collections;
    }

    /**
     * Database instance getter
     */
    public static get instance(): Database {
        if (!Database._instance)
            Database._instance = new Database();
        return Database._instance;
    }
}

export default Database;
