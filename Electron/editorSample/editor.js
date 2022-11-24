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

    sidebar.addEventListener('dragover', (event) => {
        event.preventDefault()
        current_fname = null
        folder_path = null
        folder_items = null
    })
    sidebar.addEventListener('drop', event => {
        editor.session.getDocument().setValue('')
        changed = false
        const folder = event.dataTransfer.files[0]
        folder_path = folder.path
        window.electronAPI.loadFolder(folder_path)
    })
})


const setTheme = (theme) => {
    editor.setTheme(`ace/theme/${theme}`)
}

const setMode = (mode) => {
    editor.session.setMode(`ace/mode/${mode}`)
}

const setFontSize = (size) => editor.setFontSize(size)

window.electronAPI.handleFolderItems((event, files) => {
    console.log('tree to updated')
    let listHtml = '<ul>'
    files.forEach(f => {
        listHtml += `<li id="item${f}" onclick="openfile('${f}')">${f}</li>`
    })
    listHtml += '</ul>'
    sidebar.innerHTML = listHtml
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
window.electronAPI.showCreateFileModal( () => $('#save-modal').modal('show') )
window.electronAPI.showFindModal( () => $('#find-modal').modal('show'))
window.electronAPI.findnext( () => editor.findNext())
window.electronAPI.findprev( () => editor.findPrevious())
window.electronAPI.showReplaceModal( () => {
    document.querySelector('#input_find2').value = ''
    document.querySelector('#input_replace').value = ''
    $('#replace-modal').modal('show')
})

const replaceNext = () => {
    const pattern = document.querySelector('#input_replace').value
    editor.replace(pattern, {
        backwards: false,
        wrap: false,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
    })
}
window.electronAPI.replaceNext(replaceNext)
const replaceNow = () => {
    const pattern = document.querySelector('#input_find2').value
    editor.focus()
    editor.gotoLine(0)
    editor.find(pattern, {
        backwards: false,
        wrap: false,
        caseSinsitive: false,
        wholeWord: false,
        regExp: false
    })
    replaceNext()
}
window.electronAPI.replaceAll(() => {
    const pattern = document.querySelectro('#input_find2').value
    editor.focus()
    editor.find(pattern, {
        backwards: false,
        wrap: false,
        caseSinsitive: false,
        wholeWord: false,
        regExp: false
    })
    const replaced = document.querySelector('#input_replace').value
    editor.replaceAll(replaced, {
        backwards: false,
        wrap: false,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
    })
})

const search = () => {
    const searchTarget = document.querySelector('#input_find').value
    editor.focus()
    editor.gotoLine(0)
    editor.find(searchTarget, {
        backwards: false,
        wrap: false,
        caseSnsitive: false,
        wholeWord: false,
        regExp: false
    })
}

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
