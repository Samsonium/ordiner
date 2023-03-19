const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const DB = require('./database.cjs');

/** @type {BrowserWindow} */
let mainWindow;

/** @type {DB} */
let db = DB.instance;

/**
 * Create window and load page
 */
function createWindow() {
    db.loadCollections();
    mainWindow = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        autoHideMenuBar: true,
        center: true,
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, 'preload.cjs')
        }
    });

    const mode = process.env.NODE_ENV;
    const url = mode == 'dev'
        ? 'http://localhost:7910'
        : `file://${join(__dirname, '../public/index.html')}`
    mainWindow.loadURL(url);
    mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(createWindow.bind(this));
app.on('window-all-closed', () => (process.platform !== 'darwin' ? app.quit() : null));
app.on('activate', () => (mainWindow == null ? createWindow() : null));
