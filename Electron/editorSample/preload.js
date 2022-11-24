const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    handleFolderItems: callback => ipcRenderer.on('handle-folder-items', callback),
    setFolderPath: callback => ipcRenderer.on('set-folder-path', callback),
    joinPath: (dirname, fname) => ipcRenderer.invoke('joinPath', dirname, fname),
    readFile: path => ipcRenderer.invoke('readFile', path),
    extname: path => ipcRenderer.invoke('extname', path),
    writeFile: (filename, content) => ipcRenderer.invoke('writeFile', filename, content),
    savefile: callback => ipcRenderer.on('save-file', callback),
    showCreateFileModal: callback => ipcRenderer.on('show-create-file-modal', callback),
    loadFolder: folderpath => ipcRenderer.invoke('loadFolder', folderpath),
    showFindModal: callback => ipcRenderer.on('show-find-modal', callback),
    findnext: callback => ipcRenderer.on('findnext', callback),
    findprev: callback => ipcRenderer.on('findprev', callback),
    showReplaceModal: callback => ipcRenderer.on('show-replace-modal', callback),
    replaceNext: callback => ipcRenderer.on('replace-next', callback),
    replaceAll: callback => ipcRenderer.on('replace-all', callback)
})