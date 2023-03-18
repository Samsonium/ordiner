import Loki from 'lokijs';

/** Loki database wrapper */
class Database {
    private static _instance: Database;

    /**
     * Database collections names
     */
    private static readonly collectionNames: string[] = [
        'projects', 'calendar', 'customers', 
        'products', 'tasks',    'settings'
    ];

    /**
     * Database instance
     */
    private readonly db: Loki;
    
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
        for (const cName of Database.collectionNames) {
            const collection = this.db.getCollection(cName);
            if (collection) this.db.loadCollection(collection);
            else this.db.addCollection(cName);
        }
    }

    /**
     * Close database normally
     */
    public close(): void {
        this.db.close();
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
