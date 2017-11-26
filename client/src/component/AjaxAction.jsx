import React from 'react';
import $ from 'jquery';

const AjaxAction = (url,type,dataType,data,successAction) =>{
  $.ajax({
    url: '/isLogin',
    type: 'GET',
    dataType: 'json',
    async:false
  }).done((e)=>{
    if(e.isLogin){
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
        return false
      })
    }else{
      window.location = "/login"
      return false
    }
  })
}
export default AjaxAction
