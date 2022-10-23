const {app, BrowserWindow} = require('electron');

const logSenderID = (event) => { console.log('focus', event.sender.id)}

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        // backgroundColor: '#660066',
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    win.canMove = true;
    win.on('ready-to-show', ()=> { win.show() })
    win.on('show', () => {console.log('show browser-window')})
    // win.on('focus', (event) => {
    //     event.sender.canMove = !event.sender.canMove
    //     console.log('canMove: ', event.sender.canMove)
    // })
    win.on('focus', ({sender}) => {
        const p = sender.getPosition()
        const s = sender.getSize()
        p[0] += 10
        p[1] += 10
        s[0] += 10
        s[1] += 10
        sender.setPosition(p[0], p[1], true) //3rd for animation
        sender.setSize(s[0], s[1], true)
        const b = sender.getBounds()
        console.log('bounds: [', b.x , ',', b.y, ',', b.width, ',', b.height, ']')
    })
    // win.on('will-move', (event) => { if(!event.sender.canMove) event.preventDefault() })
    // win.on('move', ({sender}) => { console.log('move to:', sender.getPosition()) })
    // win.on('will-resize', (event) => { if(event.sender.canMove) event.preventDefault() })
    // win.on('resize', ({sender}) => { console.log('resizze to: ', sender.getSize()) })
    
    const webc = win.webContents
    webc.on('new-window', () => { console.log('new-window') })
    webc.on('did-finish-load', () => { console.log('did finish load.') })
    webc.on('dom-ready', () => { console.log('dom-ready') })
    webc.on('will-navigate', () => { console.log('will-navigate') })
    webc.on('did-navigate', () => { console.log('did-navigate') })
    
    win.loadFile('index.html')
    // win.loadURL('https://www.tuyano.com')
    win.webContents.openDevTools()
    
    const child1 = new BrowserWindow({
        width: 350,
        height: 200,
        parent: win,
        // frame: false,
        // transparent: true,
        // modal: true,
        webPreferences:{
            nodeIntegration: true
        }
    })
    child1.loadURL('https://www.tuyano.com')
    // child1.loadFile('sub.html')
    child1.on('focus', logSenderID)

    // const child2 = new BrowserWindow({
    //     width: 350,
    //     height: 250,
    //     parent: win,
    //     opacity: 0.5
    // })
    // child2.loadFile('sub.html')
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('will-finish-launching', ()=> { console.log('will-finish-launching')})
// app.on('browser-window-focus', (event) => { console.log('browser-window-focus: ', event.sender.id)})
// app.on('browser-window-blur', (event) => { console.log('browser-window-blur: ', event.sender.id) })
app.on('browser-window-created', () => { console.log('browser-window-created') })
app.on('web-contents-created', () => console.log('web-contents-created'))