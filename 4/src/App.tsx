import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom"
import loadable from '@loadable/component'

import { Button } from 'antd';

const HomeComponent = loadable(() => import(/* webpackChunkName: "home" */ '@pages/Home'))
const AboutComponent = loadable(() => import(/* webpackChunkName: "about" */ '@pages/About'))

const imgPath = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <img src={imgPath}/>
        Hello React
        <Router>
          <ul>
            <li>
              <Button><Link to="/">To Home</Link></Button>
            </li>
            <li>
              <Button><Link to="/about">To About</Link></Button>
            </li>
          </ul>
          <Route exact path='/' component={HomeComponent}></Route>
          <Route path='/about' component={AboutComponent}></Route>
        </Router>
        <p className="aps">talk is cheap, show the code</p>
      </div>
    )
  }
}
export default App
