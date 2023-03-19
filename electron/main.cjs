const { app, BrowserWindow } = require('electron');
const { join } = require('path');

/** @type {BrowserWindow} */
let mainWindow;

/**
 * Create window and load page
 */
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
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
