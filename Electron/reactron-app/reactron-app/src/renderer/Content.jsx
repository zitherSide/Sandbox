import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'

const Content = () => {
  const [title] = useState('Hello Component!')
  //   const [title, setTitle] = useState('Hello Component!')
  const [message, setMessage] = useState('This is a Sample Component!')
  const [classname, setClassname] = useState('alert alert-warning')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  let fielddata = ''

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

  return (
    <div className={classname}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="alert alert-primary">
        <p>This is App-class component {count}</p>
        <button className="btn btn-primary" onClick={onclick}>click</button>
        <hr />
        <ul className="list-group">
          {list.map(val => (
            <li key={val} className="list-group-item">{val}</li>
          ))}
        </ul>
        <hr />
        <div className="row m-0">
          <input type="text" className="form-control col-10" onChange={syncData}/>
          <button className="btn btn-primary col-2" onClick={add2List}>Click</button>
        </div>
      </div>

    </div>
  )
}

export default hot(Content)
