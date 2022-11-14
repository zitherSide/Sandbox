const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api', {
    readFile: (arg) => ipcRenderer.invoke('readFile', arg),
    showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
    writeFile: (path, content) => ipcRenderer.invoke('writeFile', path, content),
    showSaveDialog: () => ipcRenderer.invoke('showSaveDialog'),
    get: (url) => ipcRenderer.invoke('get', url),
    get_json_data: (urldata) => ipcRenderer.invoke('get-json-data', urldata),
    getRss: (url) => ipcRenderer.invoke('getRss', url)
})

ipcRenderer.on('get-json-data-result', (result, data) => {
    document.querySelector('#msg').nextElementSibling.innerHTML = data
})
