let editor = null
let folder_path = null
let folder_items = null
let current_fname = null
let sidebar = null
let footer = null
let changed = false

window.addEventListener('DOMContentLoaded', () => {
    footer = document.querySelector('#footer')
    sidebar = document.querySelector('#sidebar')

    editor = ace.edit('editor_area')
    editor.setTheme('ace/theme/dracula')
    editor.session.setMode('ace/mode/text')
    editor.focus()
    editor.session.getDocument().on('change', ob => changed = true)
})

const setTheme = (theme) => {
    editor.setTheme(`ace/theme/${theme}`)
}

const setMode = (mode) => {
    editor.session.setMode(`ace/mode/${mode}`)
}

const setFontSize = (size) => editor.setFontSize(size)

window.electronAPI.handleFolderItems((event, files) => {
    let listHtml = '<ul>'
    files.forEach(f => {
        listHtml += `<li id="item${f}" onclick="openfile('${f}')">${f}</li>`
    })
    listHtml += '</ul>'
    sidebar.innerHTML = listHtml
    console.log('tree updated')
})
window.electronAPI.setFolderPath((event, folderpath) => folder_path = folderpath)

const openfile = (filename) => {
    savefile()
    current_fname = filename
    window.electronAPI.joinPath(folder_path, current_fname)
        .then(fpath => window.electronAPI.readFile(fpath))
        .then(res => {
          editor.session.getDocument().setValue(res)
          changed = false
          footer.textContent = `"${current_fname}" loaded.`
          return window.electronAPI.extname(current_fname)
        })
        .then(ext => setMode(extMode[ext]))
        .catch(e => alert(e))
}

const extMode = {
    '.txt': 'text',
    '.js': 'javascript',
    '.json': 'javescript',
    '.html': 'html',
    '.py': 'python',
    '.php': 'php'
}

const savefile = () => {
    if(!changed) { return }

    window.electronAPI.joinPath(folder_path, current_fname)
        .then(fpath => {
            const data = editor.session.getDocument().getValue()
            return window.electronAPI.writeFile(fpath, data)
        }).then(res => changed = false)
        .catch(e => alert(e))
}

window.electronAPI.savefile(event => {
    savefile()
})
window.electronAPI.showCreateFileModal( () =>  {
    $('#save-modal').modal('show') 
})

const createfileresult = () => {
    current_fname = document.querySelector('#input_file_name').value
    window.electronAPI.joinPath(folder_path, current_fname)
        .then(fpath => window.electronAPI.writeFile(fpath, ''))
        .then(res =>{
            editor.session.getDocument().setValue('')
            footer.textContent = `"${current_fname} created.`
            changed = false
        })
        .catch(e => alert(e))
}