import React,{Component} from 'react';
import {BrowserRouter as hashHistory} from 'react-router-dom';
import $ from 'jquery';
import history from '../history.jsx';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { FormControl} from 'material-ui/Form';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Dialog, {DialogActions,DialogContent} from 'material-ui/Dialog';
class PostPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      kind:'',
      imgUrl:[],
      snackopen:false,
      snackmsg:'',
      diopen:false,
    }
  }
  onFileUpload = () =>{
    if(this.state.imgUrl.length > 0){
      this.setState({snackopen:true,snackmsg:'图片不超过一张'})
      return false
    }
    var file = this.file.files[0]
    if (typeof (file) === "undefined" || file.size <= 0) {
      this.setState({snackopen:true,snackmsg:'请选择图片'})
      return;
    }
    var formFile = new FormData()
    formFile.append("action", "UploadVMKImagePath")
    formFile.append("file", file)
    this.fetch({
      url: '/postimg',
      data: formFile,
      type: "Post",
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
    })
  }
  onDelectimg = () =>{
    this.file.files[0] = null
    this.file.value = null
    this.setState({imgUrl:[]})
    console.log(this.file.value)
  }
  onTextUpdate = () =>{
    var props = ['name','tel','address'];
    for(let item of props){
      if(!this.check({prop:item})){
        console.log(!this.check({prop:item}))
        return false
      }
    }
    var data = {
      name:this.name.value,
      tel:this.tel.value,
      address:this.address.value,
      kind:this.state.kind,
      imgUrl:this.state.imgUrl[0]
    }
    this.fetch({
      url: '/postText',
      type: 'POST',
      dataType: 'json',
      data: data,
    })
  }
  fetch = (option) =>{
    $.ajax(option)
    .done((e)=>{
      if(option.url === '/postText'){
        history.push({pathname:'/login'})
      }
      let imgUrl = this.state.imgUrl
      if(imgUrl.length <= 0){
        imgUrl.push(e.path)
        this.setState({ imgUrl });
      }
      this.setState({snackopen:true,snackmsg:'提交/上传成功'})
      return true
    })
  }
  handleSnackClose = () =>{
    this.setState({snackopen:false})
  }
  changePhone = (name) =>event =>{
    this.setState({[name]:event.target.value})
  }
  handleDialogClose = () =>{
    this.setState({diopen:false})
  }
  check = ({prop = 'name'}) =>{
    if(this[prop].value === '' || this[prop].value === null){
      this.setState({snackopen:true,snackmsg:`${this[prop].getAttribute('name')}不能为空`})
      return false
    }
    if(this.state.imgUrl[0] === '' || this.state.imgUrl[0] === null){
      this.setState({snackopen:true,snackmsg:`图片不能为空`})
      return false
    }else if(this.state.kind === null || this.state.kind === ''){
      this.setState({snackopen:true,snackmsg:`手机型号不能为空`})
      return false
    }else if(!/^[0-9]{11,11}$/.test(this.tel.value)){
      this.setState({snackopen:true,snackmsg:`输入正确的电话号码`})
      return false
    }
    return true
  }
  componentDidMount(){
  }
  render(){
    var imgUrl = this.state.imgUrl;
    return(
      <form noValidate autoComplete = "off" className = "inner">
        <h1 style = {{textAlign:'center'}}>DIY手机壳</h1>
        <TextField required label="姓名" name = "姓名" margin = "normal" inputRef = {(name)=>this.name = name} />
        <TextField required type = 'number' label="电话" name = "电话" margin = "normal" inputRef = {(tel)=>this.tel = tel} />
        <TextField required label="地址" name = "地址" margin = "normal" inputRef = {(address)=>this.address = address} />
        <FormControl margin = "normal">
          <InputLabel htmlFor="kind">选择手机型号</InputLabel>
          <Select onChange = {this.changePhone('kind')} value = {this.state.kind} input = {<Input id="kind" />}>
            <MenuItem value = "iphone5">
              iphone5/5s/se
            </MenuItem>
            <MenuItem value = "iphone6">
              iphone6/6s/7
            </MenuItem>
            <MenuItem value = "iphone6p">
              iphone6p/7p
            </MenuItem>
            <MenuItem value = "xiaomi6">
              小米6
            </MenuItem>
            <MenuItem value = "pixel">
              google pixel
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl margin = "normal">
          <input onChange = {this.onFileUpload} ref = {(file) => this.file = file} style = {{display:'none'}} accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" />
          <label htmlFor="file">
            <Button raised component="span">
              Upload
            </Button>
          </label>
          <GridList cellHeight={200} spacing={1} style = {{transform: 'translateZ(0)'}}>
            {imgUrl.map((item,i) => (
               <GridListTile key={i} height = {'auto'}>
                 <img src={item} alt='图片' onClick = {() =>{
                   this.setState({diopen:true})
                 }} />
                 <GridListTileBar
                   title='选中图片'
                   titlePosition="top"
                   actionIcon={
                     <IconButton onClick = {this.onDelectimg}>
                       <CloseIcon color = "white" />
                     </IconButton>
                   }
                   actionPosition="right"
                 />
               </GridListTile>
             ))}
          </GridList>
          <Dialog open={this.state.diopen} onRequestClose={this.handleDialogClose} maxWidth = "md">
          <DialogContent>
            <img src = {this.state.imgUrl[0]} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                好的
              </Button>
            </DialogActions>
          </Dialog>
        </FormControl>
        <Button raised onClick = {this.onTextUpdate}>提交</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackopen}
          autoHideDuration={6000}
          onRequestClose={this.handleSnackClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackmsg}</span>}
          action={[
            <Button key="undo" color="accent" dense onClick={this.handleSnackClose}>
              知道了
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </form>
    )
  }
}

export default PostPage;