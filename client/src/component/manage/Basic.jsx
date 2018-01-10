import React,{Component} from 'react';
import AjaxAction from '../AjaxAction.jsx';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import {EnhancedTableHead,EnhancedTableToolbar} from './TableHead';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import { CircularProgress,LinearProgress } from 'material-ui/Progress';
import Notice from '../Notice';
import { GridList,GridListTile } from 'material-ui/GridList';
import TrendingFlat from 'material-ui-icons/TrendingFlat';
import LinearScale from 'material-ui-icons/LinearScale';
var socket = io.connect('http://localhost:3002');

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: '姓名' },
  { id: 'tel', numeric: true, disablePadding: false, label: '电话' },
  { id: 'address', numeric: true, disablePadding: false, label: '地址' },
  { id: 'kind', numeric: true, disablePadding: false, label: '手机型号' },
  { id: 'finish', numeric: true, disablePadding: false, label: '是否完成' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *2,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tablerow: {
    marginLeft:'10px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  StatusPage:theme.mixins.gutters({
    width:'100%',
    backgroundColor:'#3F51B5',
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#757575',
    height:'100%',
    padding:'1rem'
  }),
  outer:{
    marginTop: theme.spacing.unit * 2,
  },
  Status:{
    color:'white',
    display: 'flex',
    alignItems: 'center',
    fontSize:'1.1rem',
    padding:'0.5rem',
    paddingLeft:'1rem'
  },
  LinePro:{
    marginTop:'auto'
  },
});

class StatusPage extends Component {
  static PropTypes = {
    title:PropTypes.string.isRequired,
    Status:PropTypes.string.isRequired
  }
  render = () => {
    const {classes} = this.props
    return(
      <Paper style = {{backgroundColor:this.props.Color}} className = {classes.StatusPage} elevation={4}>
        <Typography type="headline" component="h3" style = {{color:'white'}}>
          {this.props.title}
        </Typography>
        <Typography type="body1" component="p" style = {{color:'white'}}>
          {this.props.Status}
        </Typography>
      </Paper>
    )
  }
}
StatusPage = withStyles(styles)(StatusPage)
class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'tel',
      selected: [],
      delete:[],
      data: [],
      page: 0,
      rowsPerPage: 5,
      loading:false,
      success:false,
      snackmsg:'',
      snackopen:false
    };
  }
  getDatas = (status = 'all') =>{
    fetch('getData',{
      method:"post",
      body:JSON.stringify({status:status}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response)=>{
      response.json().then((data) => {
        console.log(data.datas)
        this.setState({
          data: data.datas.sort((a, b) => (a.tel < b.tel ? -1 : 1))
        })
      })
    })
  }
  componentDidMount(){
    this.getDatas('all')
  }
  handleStatusSelect = (status) => {
    this.getDatas(status)
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    console.log(checked)
    if (checked) {
      this.setState({ selected: this.state.data.filter(m=>m.finish === 0).map(n=>n.id)});
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleSnackClose = ()=>{
    this.setState({snackopen:false})
  }

  opensnack = () =>{
    this.setState({snackmsg:'确定删除吗？',snackopen:true})
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleDelete = () =>{
    this.setState({snackopen:false})
    var data = this.state.data
    this.state.selected.map((item) =>{
      data = data.filter((e)=>{
        return e.id !== item
      })
    })
    this.setState({data})
  }
  handlePrint = () =>{
    var data = this.state.data
    this.state.selected.map((item) => {
      data.map((e) => {
        if(e.id === item){
          if(e.finish === 0){
            e.finish = 2
          }
        }
      })
      this.setState({data})
      socket.emit('print',item)
      this.setState({loading:true})
      socket.on('printed',(backdata)=>{
        data.map((e) => {
          if(e.id === item){
            e.finish = 1
          }
        })
        this.setState({data,loading:false})
      })
      return true
    })
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  isDelete = id => this.state.delete.indexOf(id) !== -1;

  render() {
    const classes = this.props.classes;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    return (
      <div className = {classes.outer}>
        <GridList cols = {10}>
          <GridListTile cols = "4" rows = "1" style = {{height:'auto'}}>
            <GridList>
              <GridListTile onClick = {this.handleStatusSelect.bind(null,'all')} cols = "1" rows = "1" style = {{height:'auto'}}>
                <StatusPage title = "订单总数" Status = {data.length} Color = "#2196F3" />
              </GridListTile>
              <GridListTile onClick={this.handleStatusSelect.bind(null,'waiting')} cols = "1" rows = "1" style = {{height:'auto'}}>
                <StatusPage title = "待打印" Status = {data.filter((item) => {return item.finish == 0}).length} Color = "#EF5350" />
              </GridListTile>
              <GridListTile onClick={this.handleStatusSelect.bind(null,'finish')} cols = "1" rows = "1" style = {{height:'auto'}}>
                <StatusPage title = "已完成" Status = {data.filter((item) => {return item.finish == 1}).length} Color = "#8BC34A" />
              </GridListTile>
              <GridListTile onClick={this.handleStatusSelect.bind(null,'doing')} cols = "1" rows = "1" style = {{height:'auto'}}>
                <StatusPage title = "正在打印" Status = {data.filter((item) => {return item.finish == 2}).length} Color = "#2196F3" />
              </GridListTile>
            </GridList>
          </GridListTile>
          <GridListTile cols = "6" rows = "1">
            <Paper className = {classes.StatusPage} elevation={4} style={{padding:'0'}}>
              <Typography type="headline" component="h3" style = {{color:'white',padding:'1rem',paddingBottom:'0'}}>
                正在打印
              </Typography>
              <Typography type="body1" component="h4" className = {classes.Status}>
                取料&nbsp;&nbsp;<TrendingFlat />
              </Typography>
              <div className = {classes.LinePro} style = {{display:this.state.loading?'inline':'none'}} >
                <LinearProgress />
              </div>
            </Paper>
          </GridListTile>
        </GridList>
        <Paper className={classes.root}>
          <EnhancedTableToolbar handleDelete = {this.opensnack} handlePrint = {this.handlePrint} numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table>
              <EnhancedTableHead
                columnData = {columnData}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.filter(m=>m.finish === 0).length}
                />
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.id);
                  const isDelete = this.isDelete(n.id);

                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      onKeyDown={event => this.handleKeyDown(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className = {classes.tablerow}
                      display = {isDelete}
                      >
                      <TableCell>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell numeric>{n.tel}</TableCell>
                      <TableCell numeric>{n.address}</TableCell>
                      <TableCell numeric>{n.kind}</TableCell>
                      <TableCell style = {{color:n.finish === 0?'#FF5252':'#558B2F'}} numeric>{n.finish === 0?'待完成':n.finish === 2?<CircularProgress />:'完成'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
              </TableFooter>
            </Table>
          </div>
          <Notice
            handleSnackClose = {this.handleSnackClose}
            handleaction = {this.handleDelete}
            snackopen = {this.state.snackopen}
            snackmsg = {this.state.snackmsg}
            />
        </Paper>
      </div>
    );
  }
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
