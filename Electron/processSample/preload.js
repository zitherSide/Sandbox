const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('testapi', {
    createWindow: () => ipcRenderer.invoke('createWindow'),
    showContextMenu: () => ipcRenderer.invoke('showContextMenu'),
    createMenu: () => ipcRenderer.invoke('createMenu'),
    closeOthers: (arg) => ipcRenderer.invoke('closeOthers', arg),
    showDialog: () => ipcRenderer.invoke('showMsgBox'),
    doit: callback => ipcRenderer.on('doit', callback),
    doDb: callback => ipcRenderer.on('doDb', callback)
})
