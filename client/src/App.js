import React,{Component} from 'react';
import ManageRouter from './component/Router';
import { Router } from 'react-router-dom';
import history from "./history.jsx";
import './App.css';

class App extends Component {
  render(){
    return(
      <div className = "home">
        <Router history={history}>
          <ManageRouter />
        </Router>
      </div>
    )
  }
}

export default App;
