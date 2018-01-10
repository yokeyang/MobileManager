import React from 'react';
import $ from 'jquery';

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

const AjaxAction = (url,type,dataType,data,successAction) =>{
  let user = checkCookie('user')
  let psd = checkCookie('psd')
  let Smanager = checkCookie('Smanager')
  if(user&&Smanager){
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data
    })
    .done((k)=> {
      setTimeout(successAction.call(null,k),10)
      return true
    })
    .fail(()=>{
      window.location = "/login"
      return false
    })
  }else{
    window.location = "/login"    
  }
}
export default AjaxAction
