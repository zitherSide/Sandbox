const {app, Menu, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const { createInflate } = require('zlib')
const fs = require('fs').promises

const createWindow = () => {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.on('close', event => win.webContents.send('save-file'))
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
const openfolder = () => {
    const w = BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(w, {properties: ['openDirectory']})
        .then(res => loadFolder(res.filePaths[0]))
}
const loadFolder = (folderpath) => {
    const w = BrowserWindow.getFocusedWindow()
    w.webContents.send('set-folder-path', folderpath)
    fs.readdir(folderpath)
        .then(files => w.webContents.send('handle-folder-items', files))
        .catch(e => console.log(e))
}

const createMenu = () => {
    const menuTemp = [
        {
            label: 'File',
            submenu: [
                {label: 'New', click: () => {createWindow()}},
                {label: 'Open folder...', click: () => openfolder()},
                {label: 'Create file', click: () => {
                    const w = BrowserWindow.getFocusedWindow()
                    w.webContents.send('show-create-file-modal')
                }},
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
                {label: 'github', click: () => setTheme('github')},
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

ipcMain.handle('joinPath', (event, dirname, fname) => path.join(dirname, fname))
ipcMain.handle('readFile', (event, path) => fs.readFile(path).then(res => res.toString()))
ipcMain.handle('extname', (event, filename) => path.extname(filename))
ipcMain.handle('writeFile', (event, filename, content) => fs.writeFile(filename, content))
ipcMain.handle('loadFolder', (event, folderpath) => loadFoler(folderpath))