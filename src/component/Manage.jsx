import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import { withStyles,createMuiTheme,MuiThemeProvider } from 'material-ui/styles';
import classNames from 'classnames';
import Dialog from 'material-ui/Drawer';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List,{ListItemText,ListItem} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Explore from 'material-ui-icons/Explore';
import Info from 'material-ui-icons/Info';
import AccountCircle from 'material-ui-icons/AccountCircle';
import History from 'material-ui-icons/History';
import Avatar from 'material-ui/Avatar';
const drawerWidth = 200
const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    position: 'absolute',
    backgroundColor:'#009688',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button_outer:{
    marginRight:'auto',
    marginLeft:'1rem',
    alignSelf:'flex-end',
    color:'white',
    fontSize:'0.8rem'
  },
  button_avatar:{
    textDecoration:'none',
    textTransform: 'capitalize',
    padding:'0',
    minWidth:'auto',
    borderRadius:'100%',
  },
  avatar:{
    color: '#fff',
    background:'#673AB7',
    width:'3rem',
    height:'3rem',
  },
  listButton:{
    textDecoration:'none',
    color:'#9E9E9E',
    '&:hover':{
      color:'#29B6F6'
    }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width:'12vw',
    minWidth:'300px',
    width: drawerWidth,
    height:'100vh',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    height:'25vh',
    backgroundImage:'url(http://localhost:3000/yellow.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    width: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});
class Manage extends Component {
  constructor(props){
    super(props);
    this.state = {
      barOpen:false
    }
  }
  handleDrawerOpen = () => {
    this.setState({ barOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ barOpen: false });
  };
  render(){
    const { classes } = this.props;
    return(
    <div className={classes.appFrame}>
      <AppBar className={classNames(classes.appBar, this.state.barOpen && classes.appBarShift)}>
        <Toolbar disableGutters={!this.state.barOpen}>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, this.state.barOpen && classes.hide)}
            >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            后台管理
          </Typography>
        </Toolbar>
      </AppBar>
      <Dialog
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.barOpen}
        onRequestClose={this.handleDrawerClose}
        >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            {this.props.user?(
              <div className = {classes.button_outer}>
                <Button className = {classes.button_avatar}>
                  <Avatar className = {classes.avatar}>{this.props.user}</Avatar>
                </Button>
                <p>你好：{this.props.user} 您可以选择操作</p>
              </div>
            ):<p className = {classes.button_outer}>未登录</p>}
            <IconButton onClick={this.handleDrawerClose} style = {{alignSelf:'flex-start'}}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to = "/manage">
              <ListItem button className = {classes.listButton}>
                <Explore />
                <ListItemText primary="基本操作" />
              </ListItem>
            </Link>
          </List>
          <Divider />
            <List>
              <Link to = "/manage/user">
                <ListItem button className = {classes.listButton}>
                  <AccountCircle />
                  <ListItemText primary="用户管理" />
                </ListItem>
              </Link>
            </List>
          <Divider />
          <List>
            <Link to = "/manage/history">
              <ListItem button className = {classes.listButton}>
                <History />
                <ListItemText primary="后台日志" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Dialog>
      <main className={classNames(classes.content, this.state.barOpen && classes.contentShift)}>
        <MuiThemeProvider theme = {createMuiTheme({status:{color:'#03A9F4'}})}>
          {this.props.children}
        </MuiThemeProvider>
      </main>
    </div>
    )
  }
}

export default withStyles(styles)(Manage);
