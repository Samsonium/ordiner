const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    setTitle: (title) => (ipcRenderer.send('set-title', title))
})
