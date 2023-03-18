import { BrowserWindow, ipcMain } from "electron";
import path from "path";

/**
 * Main application window
 */
class AppWindow {
    private readonly win: BrowserWindow;

    public constructor() {
        this.win = new BrowserWindow({
            minWidth: 1000,
            minHeight: 800,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                preload: path.resolve('./electron/preloader/preload.cjs')
            }
        })
    }
}

export default AppWindow;
