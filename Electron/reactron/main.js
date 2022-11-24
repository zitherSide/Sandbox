const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.openDevTools()
}

app.whenReady().then(createWindow)
