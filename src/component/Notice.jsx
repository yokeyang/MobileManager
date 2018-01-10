import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

export default class Notice extends Component{
  static propTypes = {
    snackopen:PropTypes.bool.isRequired,
    handleSnackClose:PropTypes.func.isRequired,
    snackmsg:PropTypes.string.isRequired,
    handleSnackClose:PropTypes.func.isRequired,
    handleaction:PropTypes.func.isRequired,
  }
  render(){
    const {snackopen,handleSnackClose,snackmsg,handleaction} = this.props;
    return(
      <Snackbar
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
       }}
       open={snackopen}
       autoHideDuration={6000}
       onRequestClose={handleSnackClose}
       SnackbarContentProps={{
         'aria-describedby': 'message-id',
       }}
       message={<span id="message-id">{snackmsg}</span>}
       action={[
         <Button key="undo" color="accent" dense onClick={handleaction}>
           是的
         </Button>,
         <IconButton
           key="close"
           aria-label="Close"
           color="inherit"
           onClick={handleSnackClose}
         >
           <CloseIcon />
         </IconButton>,
       ]}
     />
    )
  }
}
