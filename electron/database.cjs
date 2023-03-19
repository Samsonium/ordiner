const Loki = require('lokijs');

/** Loki wrapper database class */
class DB {
    /**
     * DB class instance
     * @private
     * @static
     * @type {DB}
     */
    static #instance;

    /**
     * List of available collections in database
     * @public
     * @static
     * @type {string[]}
     */
    static availCollections = [
        'projects', 'tasks',    'customers',
        'todos',    'calendar', 'products'
    ];
    
    /**
     * LokiJS db instance
     * @private
     * @type {Loki}
     */
    #db;

    /**
     * Available collections
     * @private
     * @type {{ [K in typeof DB['availCollections']]: Collection }}
     */
    #collections;
    
    /**
     * Initialize DB
     * @private
     * @constructor
     */
    constructor() {
        this.#db = new Loki('ordiner.db', {
            autoload: true,
            autosave: true,
            autosaveInterval: 10000
        });
    }

    /**
     * Get DB class instance
     * @public
     * @static
     * @returns {DB}
     */
    static get instance() {
        if (!this.#instance)
            this.#instance = new DB();
        return this.#instance;
    }

    /**
     * Load or create collections
     * @public
     */
    loadCollections() {
        if (this.isCollectionsLoaded) 
            return;

        this.#collections ??= {};

        // Iterate over collection names and load or create it
        for (const name of DB.availCollections) {
            this.#collections[name] = this.#db.getCollection(name)
                ?? this.#db.addCollection(name);
        }
    }

    /**
     * Check is collections loaded
     * @public
     * @returns {boolean}
     */
    get isCollectionsLoaded() {
        return !!Object.keys(this.#collections ?? {}).length;
    }

    /**
     * Return loaded collections
     * @public
     * @returns {{ [K in typeof DB['availCollections']]: Collection }}
     */
    get collections() {
        this.loadCollections();
        return this.#collections;
    }
}

module.exports = DB;
