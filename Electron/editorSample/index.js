const {app, Menu, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.openDevTools()
    return win.id
}

const setTheme = (theme) => {
    const w = BrowserWindow.getFocusedWindow()
    w.webContents.executeJavaScript(`setTheme("${theme}")`)
}
const setMode = (mode) => {
    const w = BrowserWindow.getFocusedWindow()
    w.webContents.executeJavaScript(`setMode("${mode}")`)
}
const setFontSize = (size) => {
    const w = BrowserWindow.getFocusedWindow()
    w.webContents.executeJavaScript(`setFontSize(${size})`)
}

const createMenu = () => {
    const menuTemp = [
        {
            label: 'File',
            submenu: [
                {label: 'New', click: () => {createWindow()}},
                {role: 'close'},
                {role: 'separator'},
                {role: 'quit'}
            ]
        },
        {role: 'editMenu'},
        {
            label: 'Theme',
            submenu: [
                {label: 'textmate', click: () => setTheme('textmate')},
                {label: 'chrome', click: () => setTheme('chrome')},
                {label: 'gitihub', click: () => setTheme('github')},
                {label: 'dracula', click: () => setTheme('dracula')},
                {label: 'twilight', click: () => setTheme('twilight')},
                {label: 'pastel_on_dark', click: () => setTheme('pastel_on_dark')},
            ]
        },
        {
            label: 'Mode',
            submenu: [
                {label: 'text', click: ()=>setMode('text')},
                {label: 'javascript', click: ()=>setMode('javascript')},
                {label: 'html', click: ()=>setMode('html')},
                {label: 'python', click: ()=>setMode('python')},
                {label: 'php', click: ()=>setMode('php')},
                {label: 'cpp', click: ()=>setMode('cpp')},
            ]
        },
        {
            label: 'FontSize',
            submenu: [
                {label: '9', click: () => setFontSize(9)},
                {label: '10', click: () => setFontSize(10)},
                {label: '12', click: () => setFontSize(12)},
                {label: '14', click: () => setFontSize(14)},
                {label: '16', click: () => setFontSize(16)},
                {label: '18', click: () => setFontSize(18)},
                {label: '20', click: () => setFontSize(20)},
                {label: '24', click: () => setFontSize(24)},
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(menuTemp)
    Menu.setApplicationMenu(menu)
}

createMenu()
app.whenReady().then(createWindow)