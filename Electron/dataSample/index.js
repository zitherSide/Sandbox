const {app, Menu, BrowserWindow } = require('electron')
const { ipcMain, dialog, net } = require('electron')
const path = require('path')
const fs = require('fs').promises
const https = require('https')
const Parser = require('rss-parser')
const sqlite3 = require('sqlite3')
const mysql = require('mysql')

const dbPath = path.join(app.getPath('home'), 'mydata.db')
const db = new sqlite3.Database(dbPath)
db.serialize( () => {
    const query = 'create table if not exists users' +
                    '(id integer primary key autoincrement, ' +
                    'name text not null, ' +
                    'mail text, ' +
                    'tel text)'
    db.run(query)
})

// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'my_user',
//     password: '*****',
//     database: 'my_db'
// })
// mysqlConnection.connect( err => console.log(err) )
// mysqlConnection.query('select * from users', (err, res) => {

// })

function createWindow(){
    win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()
    return win.id
}

app.whenReady().then(createWindow)
app.on('window-all-close', () => db.close())

ipcMain.handle('readFile', (event, path) => {
    return fs.readFile(path)
            .then(content => content.toString() )
})
ipcMain.handle('showOpenDialog', (event) => {
    return dialog.showOpenDialogSync(event.sender.getOwnerBrowserWindow(), {
        properties: ['openFile'],
        filters: [
            {name: 'Text Files', extensions: ['txt']},
            {name: 'All Files', extensions: ['*']}
        ]
    })
})
ipcMain.handle('writeFile', (event, path, content) => {
    return fs.writeFile(path, content)
})
ipcMain.handle('showSaveDialog', (event) => {
    return dialog.showSaveDialogSync(event.sender.getOwnerBrowserWindow(), {
        title: 'Save Dialog',
        message: 'Input file name'
    })
})
ipcMain.handle('get', (event, url) => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = ''
            res.setEncoding('utf8')
            res.on('data', ck => data += ck)
            res.on('end', re => resolve(data))
        })

    })
})
ipcMain.handle('get-json-data', (event, urldata) => {
    let data = ''
    const request = net.request(urldata)
    request.on('response', (r) => {
        r.on('data', ck => data += ck)
        r.on('end', () => {
            const w = BrowserWindow.getFocusedWindow()
            w.webContents.send('get-json-data-result', data)
        })
    })
    request.end()
})
ipcMain.handle('getRss', (event, url) => {
    const parser = new Parser()
    return new Promise((resolve, reject) => {
        parser.parseURL(url, (err, feed) => {
            resolve(feed)
        })
    })
})

const insertUserStmt = db.prepare('insert into users (name,mail,tel) values (?,?,?);')

ipcMain.handle('addUser', (event, data) => {
    console.log('addUser')
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            console.log(data)
            insertUserStmt.run([data.name, data.mail, data.tel], err => {
                console.log('run', err)
                if(err == null){
                    resolve('succeeded')
                }else{
                    reject(err)
                }
            } )
        })
    })
})

ipcMain.handle('selectAllUsers', () => {
    return new Promise((resolve, reject) => {
        db.all('select * from users', (err, rows) => {
            if(err === null){
                resolve(rows)
            }else{
                reject(err)
            }
        })
    })
})

ipcMain.handle('querySQL', (event, sql) => {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) =>{
            if(err === null){
                resolve(rows)
            }else{
                reject(err)
            }
        })
    })
})