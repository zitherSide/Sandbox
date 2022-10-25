const {app, BrowserWindow, Menu, MenuItem} = require('electron')

function createWindow(){
    win = new BrowserWindow({
        width: 1200,
        height: 1080,
    })
    win.loadFile('menu.html')
    // win.loadFile('index.html')
}

// function createMenu(){
//     const menu = new Menu()
//     const file = new MenuItem({
//         label: 'File',
//         submenu: [
//             new MenuItem({label: 'New'}),
//             new MenuItem({label: 'File'}),
//             new MenuItem({label: 'Quit'})
//         ]
//     })
//     menu.append(file)

//     const edit = new MenuItem({
//         label: 'Edit',
//         submenu: [
//             new MenuItem({label: 'Cut'}),
//             new MenuItem({label: 'Copy'}),
//             new MenuItem({label: 'Paste'})
//         ]
//     })
//     menu.append(edit)

//     Menu.setApplicationMenu(menu)
// }

function createMenu(){
    const menu_template = [
        {
            label: 'File',
            submenu: [
                {label: 'New', click: () => {
                    console.log('New menu.')
                    createWindow()
                }},
                {label: 'File', click: () => {
                    console.log('File menu.')
                    createWindow()
                }},
                {role: 'close'},
                {type: 'separator'},
                // {label: 'Quit', click: () => {
                //     console.log('Quit menu.')
                //     app.quit()
                // }}
                {role: 'quit'}
            ]
        },
        {role: 'editMenu'},
        {role: 'viewMenu'},
        {role: 'windowMenu'},
        {label: 'Help', submenu: [
            {role: 'about'},
            {role: 'separator'},
            {role: 'reload'},
            {role: 'zoomIn'},
            {role: 'zoomOut'}
        ]}
        // {
        //     label: 'Edit',
        //     submenu: [
        //         // {label: 'Cut'},
        //         // {label: 'Copy'},
        //         // {label: 'Paste'}
        //         {role: 'cut'},
        //         {role: 'copy'},
        //         {role: 'paste'}
        //     ]
        // }
    ]
    const menu = Menu.buildFromTemplate(menu_template)
    Menu.setApplicationMenu(menu)
}

createMenu()
app.whenReady().then(createWindow)