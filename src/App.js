import React,{Component} from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './App.css'
import reducer from './reducer'
import Manager from './component/Manager'
import Dashboard from './component/Dashboard'

const store = createStore(reducer)

class App extends Component {
  render(){
    return(
        <Provider store = {store}>
          <Manager>
            <Dashboard />
          </Manager>
        </Provider>
    )
  }
}

export default App;
