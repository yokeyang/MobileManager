import React,{Component} from 'react'
import ZmCanvasCrop from './CutImage'
import { FormControl} from 'material-ui/Form'
import Button from 'material-ui/Button'


var c
export default class Getimg extends Component{
    getModalStyle = () => {
      return {
        border: '1px solid #e5e5e5',
        backgroundColor: '#fff',
        boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
        padding: 8 * 4,
      };
    }

    saveCallBack = (base64) =>{
      if(typeof(base64) === 'string'){
        this.props.imgUrl[0] = base64
      }
      console.log(this.props.imgUrl)
    }

    componentDidMount = () =>{
      c = new ZmCanvasCrop({
        fileInput: this.ipt,
        saveBtn: this.save,
        box_width: 200,  //剪裁容器的最大宽度
        box_height: 300, //剪裁容器的最大高度
        min_width: 300,  //要剪裁图片的最小宽度
        min_height: 300  //要剪裁图片的最小高度
      },this.saveCallBack);
    }
    render(){
        return(
          <div style={this.getModalStyle()}>
            <div id="canvas-box" ref = {(input) => {this.canvas_box = input}}></div>
            <FormControl margin = "normal" style = {{display:'flex',flexDirection:'row'}}>
              <input type="file" id = "ipt" style = {{display:'none'}} accept="jpg,jpeg,JPG,JPEG,png,PNG" onClick = {this.FileCut} ref = {(input) => {this.ipt = input}} defaultValue="选择图片" />
              <label htmlFor="ipt">
                <Button raised component="span" onClick = {()=>{this.setState({modal_open:true})}}>
                  Upload
                </Button>
              </label>
              <input type="button" id = "btn" style = {{display:'none'}} ref = {(input) => {this.save = input}} />
              <label htmlFor="btn" style = {{marginLeft:'auto'}}>
                <Button raised component="span" onClick = {this.saveCallBack}>
                  完成
                </Button>
              </label>
              <div ref = {(input) => {this.base64 = input}}></div>
            </FormControl>
          </div>
        )
    }
}