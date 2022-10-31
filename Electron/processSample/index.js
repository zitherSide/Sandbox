const {app, Menu, MenuItem, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.openDevTools()

    let n = 100
    let res = ''
    const wins = BrowserWindow.getAllWindows()
    for(const w in wins){
        res += '[' + wins[w].id + ']<br>'
        wins[w].setPosition(n, n)
        n += 50
    }
    return res
}

const createMenu = () => {
    const menu_template = [
        {
            label: 'New Menu',
            submenu: [
                {
                    label: 'New',
                    click: (m, thisWin) => {
                        console.log('New menu')
                        const w = BrowserWindow.getFocusedWindow()
                        // w.webContents.send('hello', 'message from app.(' + ++counter + ' counts)')
                        // const id = w.id
                        // w.webContents.executeJavaScript('hello()')
                        // createWindow()
                    }
                },
                { role: 'close' },
                { role: 'separator' },
                { role: 'quit' }
            ]
        }
    ]
    
    const menu = Menu.buildFromTemplate(menu_template)
    Menu.setApplicationMenu(menu)
}

const showContextMenu = () => {
    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'Helloo',
        click(m, w) {
            console.log('Hello menu')
            alert('Hello [id=' + w.id + ']')
        }
    }))
    menu.append(new MenuItem({type: 'separator'}))
    menu.append(new MenuItem({role: 'cut'}))
    menu.append(new MenuItem({role: 'copy'}))
    menu.append(new MenuItem({role: 'paste'}))
    menu.popup()
}

app.whenReady().then(createWindow)
ipcMain.handle('createWindow', createWindow)
ipcMain.handle('createMenu', createMenu)
ipcMain.handle('showContextMenu', showContextMenu)
ipcMain.handle('closeOthers', (event, arg) => {
    console.log('close main')
    const ws = BrowserWindow.getAllWindows()
    ws.filter(w => w.id !== arg.id)
        .forEach(w => w.close())

    return 'onlyl open id = ' + arg
})