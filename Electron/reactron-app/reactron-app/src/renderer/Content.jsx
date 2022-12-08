import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { remote } from 'electron'
import fs from 'fs'
// import fs from 'fs/promises'
// import fs from 'node:fs/promises'
// import { promsies as fs } from 'fs'

const Content = () => {
  const [title] = useState('Hello Component!')
  //   const [title, setTitle] = useState('Hello Component!')
  const [message, setMessage] = useState('This is a Sample Component!')
  const [classname, setClassname] = useState('alert alert-warning')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [fileContent, setFileContent] = useState('')
  let fielddata = ''

  const styles = [
    {
      color: 'red',
      backgroundColor: '#ffdddd',
      padding: '5px',
      borderStyle: 'solid',
      borderWidth: '5px',
      borderColor: '#990000'
    },
    {
      color: '#ddddff',
      backgroundColor: 'blue',
      padding: '5px',
      borderStyle: 'double',
      borderWidth: '7px',
      borderColor: '#eeeeff'
    }
  ]
  const [style, setStyle] = useState(styles[0])

  const onclick = e => {
    setCount(count + 1)
    const warn = 'alert alert-warning'
    const light = 'alert alert-ligth'
    setClassname(classname === warn ? light : warn)

    const warnMes = 'This is warning alert'
    const lightMes = 'This is light alert'
    setMessage(message === warnMes ? lightMes : warnMes)
  }
  const syncData = e => {
    fielddata = e.target.value
  }
  const add2List = e => {
    setList([...list, fielddata])
  }
  const changeStyle = e => {
    setStyle(styles[e.target.selectedIndex])
  }
  const loadFile = e => {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openFile'],
      filters: [
        { name: 'Text Files', extensions: ['txt'] }
      ]
    })
      .then(res => {
        // remote.dialog.showErrorBox('err', JSON.stringify(res))
        // return fs.readFile(res.filePaths[0].toString())
        return fs.readFileSync(res.filePaths[0].toString())
      })
      .then(data => setFileContent(data))
      .catch(e => remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        title: 'Catch',
        message: e.toString()
      }))
    // let pth = ''
    // if (result !== undefined) {
    //   pth = result[0]
    //   const res = fs.readFileSync(pth.toString())
    //   setFileContent(res)
    //   // fs.readFile(pth.toString()).then(data => {
    //   //   setFileContent(`${pth}をロードしました`)
    //   // }).catch(() => {
    //   //   setFileContent('キャンセルしました')
    //   // })
    // }
    // window.remoteApi.showOpenDialog()
    setFileContent('test')
  }

  return (
    <div className={classname}>
      <h2 style={style}>{title}</h2>
      <p style={style}>{message}</p>
      <div className="alert alert-primary">
        <p>This is App-class component {count}</p>
        <button className="btn btn-primary" onClick={onclick}>click</button>
        <hr />
        <ul className="list-group">
          {list.map(val => <li key={val} className="list-group-item">{val}</li>)}
        </ul>
        <hr />
        <div className="row m-0">
          <input type="text" className="form-control col-10" onChange={syncData}/>
          <button className="btn btn-primary col-2" onClick={add2List}>Click</button>
        </div>
        <select className="form-control" onChange={changeStyle}>
          <option>red</option>
          <option>blue</option>
        </select>
        <hr />
        <textarea rows="5" className="form-control" value={fileContent}></textarea>
        <button className="btn btn-primary mt-3" onClick={loadFile}>OpenFile</button>
      </div>

    </div>
  )
}

export default hot(Content)
