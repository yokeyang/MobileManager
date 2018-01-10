import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import $ from 'jquery';
import PostPage from './PostPage';
import Manage from './Manage';
import EnhancedTable from './manage/Basic';
import Login from './manage/Login';
import User from './manage/User';
import History from './manage/History';
import { setTimeout } from 'timers';

const getCookie = (name) =>{
  if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(name + "=")
  if (c_start!=-1)
    {
      c_start=c_start + name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}
const checkCookie = (cname) =>{
  var username=getCookie(cname)
  if (username!=null && username!=""){
    return true
  }else {
    return false
  }
}

const isLogin = {
  psd:checkCookie('psd'),
  user: checkCookie('user'),
  Smanager:checkCookie('Smanager'),
  setrvalue(cb){
    console.log(cb)
    setTimeout(cb,1)
    return this.user
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLogin.setrvalue() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/Login',
      }}/>
    )
  )}/>
)
const ManageRouter = () =>{
  return(
    <Switch>
      <Route exact path = "/" render = {()=><PostPage />} />
      <Route exact path = "/Login" render = {()=><Manage><Login isLogin = {isLogin} /></Manage>} />
      <PrivateRoute path = "/manage/user" component = {()=><Manage user = {isLogin.user}><User /></Manage>} />
      <PrivateRoute path = "/manage/history" component = {()=><Manage user = {isLogin.user}><History /></Manage>} />
      <PrivateRoute path = "/manage" component ={()=><Manage user = {isLogin.user}><EnhancedTable /></Manage>} />
    </Switch>
  )
}
export default ManageRouter
