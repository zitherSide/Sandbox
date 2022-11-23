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
    loadfolder: folderpath => ipcRenderer.invoke('loadFolder', folderpath)
})