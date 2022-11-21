let editor = null

window.addEventListener('DOMContentLoaded', () => {
    editorArea = document.getElementById('editor_area')
    footerArea = document.getElementById('footer')

    editor = ace.edit('editor_area')
    editor.setTheme('ace/theme/dracula')
    editor.session.setMode('ace/mode/text')
    editor.focus()
})

const setTheme = (theme) => {
    editor.setTheme(`ace/theme/${theme}`)
}

const setMode = (mode) => {
    editor.session.setMode(`ace/mode/${mode}`)
}

const setFontSize = (size) => editor.setFontSize(size)