import React,{Component} from 'react'
import { Router } from 'react-router-dom'
import Manager from './component/Manager'
import './App.css'

class App extends Component {
  render(){
    return(
      <div className = "home">
        <Manager />
      </div>
    )
  }
}

export default App;
