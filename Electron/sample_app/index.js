const {app, BrowserWindow} = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width: 500,
        height: 400,
        backgroundColor: '#660066',
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')
    // win.loadURL('https://www.tuyano.com')
    win.webContents.openDevTools()

    const child1 = new BrowserWindow({
        width: 350,
        height: 200,
        parent: win,
        frame: false,
        transparent: true,
        // modal: true,
        webPreferences:{
            nodeIntegration: true
        }
    })
    // child.loadURL('https://www.tuyano.com')
    child1.loadFile('sub.html')

    const child2 = new BrowserWindow({
        width: 350,
        height: 250,
        parent: win,
        opacity: 0.5
    })
    child2.loadFile('sub.html')
}

app.whenReady().then(createWindow)