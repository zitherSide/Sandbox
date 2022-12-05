import React from 'react'
import { hot } from 'react-hot-loader/root'
// import logo from './assets/logo.svg'
import './App.css'
import Content from './Content.jsx'
// import { remote } from 'electron'

const App = () => {
  // const electron = process.versions.electron
  // const node = process.versions.node
  // const platform = require('os').platform()
  // const version = require('../../package.json').version

  // const handleLinkClick = e => {
  //   e.preventDefault()
  //   remote.shell.openExternal(e.currentTarget.href)
  // }

  return (
    <div className="App">
      <nav className="navbar bg-primary mb-4">
        <h1 className="display-4 text-light">Reactron-app</h1>
      </nav>
      <div className="container text-primary">
        <h2>App Component</h2>
        <p>This is a sample of function component.</p>
        <Content/>
      </div>
    </div>
  )
}

export default hot(App)
