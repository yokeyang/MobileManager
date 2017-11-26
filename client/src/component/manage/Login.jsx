import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import base64 from 'js-base64';
import Notice from '../Notice';

import $ from 'jquery';
import {
  BrowserRouter as Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
const style = theme =>({
  Home:{
    width:'100%',
    margin:'0 auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:'5rem',
  },
  Login:{
    width:'100%',
    maxWidth:'500px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  }
})
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin:false,
      snackopen:false,
      snackmsg:''
    }
  }
  handleSnackClose = ()=>{
    this.setState({snackopen:false})
  }
  Login = () => {
    console.log(base64.Base64.encode(this.psd.value))
    $.ajax({
      url: '/user',
      type: 'POST',
      dataType: 'json',
      data: {user: this.user.value,password:base64.Base64.encode(this.psd.value)}
    })
    .done((data)=> {
      if(data.login){
        this.props.isLogin.setrvalue(() => {
          this.setState({ isLogin: true })
        })
        return true
      }
      this.setState({snackopen:true,snackmsg:'账号或密码错误'})
      return false
    })
    .fail(function(e) {
      console.log(e);
      return false
    })
  }
  render(){
    const classes = this.props.classes
    if (this.state.isLogin) {
      return (
        <Redirect to='/manage'/>
      )
    }
    return(
      <div className = {classes.Home}>
        <div className = {classes.Login}>
          <TextField required label="用户名" name = "用户名" margin = "normal" inputRef = {(user)=>this.user = user} />
          <TextField required type = "password" label="密码" name = "密码" margin = "normal" inputRef = {(psd)=>this.psd = psd} />
          <Button color="accent" onClick = {this.Login}>
            登录
          </Button>
        </div>
        <Notice
          handleSnackClose = {this.handleSnackClose}
          handleaction = {this.handleSnackClose}
          snackopen = {this.state.snackopen}
          snackmsg = {this.state.snackmsg}
        />
      </div>
    )
  }
}
export default withStyles(style)(Login)
