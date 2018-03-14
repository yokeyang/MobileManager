import React from 'react'
import { Table, Icon, Form, Divider, Input, Popconfirm,Modal } from 'antd'
import { connect } from 'react-redux'
import { changeData } from '../action/change-data'
import FetchData from '../reducer/FetchData'
import { fetchData } from '../action/fetch-data'
import { httprequest } from '../api/api'
const FormItem = Form.Item
const confirm = Modal.confirm

const showHeader = true;
const scroll = { y: 240 };
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
class DataTable extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
      render: (text, record) => this.renderColumns(text, record, 'tel'),
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    },{
      title: '手机型号',
      dataIndex: 'kind',
      key: 'kind',
      render: (text, record) => this.renderColumns(text, record, 'kind'),
    },{
      title: '是否完成',
      dataIndex: 'finish',
      key: 'finish',
      render: text => {return text==0?'未完成':text==1?'完成':'打印中'},
    },{
      title: '操作',
      key: 'action',
      width: 300,
      render: (text, record) => {
        const { editable } = record;
        return(
          <span>
            {
              editable ?
              <span>
                <a style = {{marginRight:'0.3rem'}} onClick={() => this.save(record.key)}>保存</a>
                <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                  <a>取消</a>
                </Popconfirm>
              </span>
              : <a onClick={() => this.edit(record.key)}>修改</a>
          }
          <Divider type="vertical" />
          <a onClick={this.showDeleteConfirm.bind(null,record.key)}>删除</a>
          <Divider type="vertical" />
          <a onClick={this.handlePrint.bind(null,record.key)}>打印</a>
        </span>
        )
      },
    }];
    this.state = {
      editable:false,
      bordered: false,
      loading: false,
      pagination: true,
      title:() => {return true},
      showHeader,
      rowSelection: {},
      scroll: undefined,
      selectedRowKeys:[]
    }
    this.props.getData((data)=>{
      this.cacheData = data.map(key => [{...key}])
    })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  renderColumns = (text, record, column) => {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  showDeleteConfirm = (key) => {
    let that = this
    confirm({
      title: '确认删除吗？',
      content: '请谨慎考虑',
      okText: '是的',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        that.handleDelete(key)
      },
      onCancel () {
        return console.log('Cancel');
      },
    });
  }
  handleChange = (value, key, column) => {
    const newData = [...this.props.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ editable: true })
      console.log(this.cacheData)
    }
  }
  handleDelete = (key) => {
    console.log(key)
  }
  handlePrint = (key) =>{
    console.log(key)
  }
  edit = (key) => {
    this.newData = [...this.props.data];
    console.log(this.newData)
    this.target = this.newData.filter(item => key === item.key)[0];
    if (this.target) {
      this.target.editable = true;
      this.setState({editable :this.target.editable})
      this.props.changeData(key,this.target)
    }
  }
  save = (key) => {
    const newData = this.newData
    const target = this.target
    if (target) {
      delete target.editable;
      this.setState({ editable: this.target.editable })
      this.cacheData = newData.map(item => ({ ...item }))
    }
    this.props.changeData(key,target)
  }
  cancel = (key) => {
    const newData = this.newData
    const target = this.target
    if (target) {
      Object.assign(target, this.cacheData.filter(item => item[0].key === key)[0][0]);
      delete target.editable;
      this.setState({ editable: this.target.editable })      
    }
  }
  ChangeStatue = (data) =>{
    this.props.all(data.length)
    this.props.waiting(data.filter((item) => {return item.finish == 0}).length)
    this.props.doing(data.filter((item) => {return item.finish == 2}).length)
    this.props.finish(data.filter((item) => {return item.finish == 1}).length)
  }

  componentDidMount = () =>{
    this.setState({
      title:() => {return(
        <div className = "table_title">
          <p>订单表单</p>
          <div className = "table_title_button">
            <a onClick = {this.handlePrint.bind(null,this.state.selectedRowKeys)}>打印</a>
            <Divider type="vertical" />
            <a onClick = {this.handleDelete.bind(null,this.state.selectedRowKeys)}>删除</a>
          </div>
        </div>
      )}
    })
  }
  render() {
    
    const { state, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <Table {...this.state} rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {data:state.FetchData}
}
const mapDispatchToProps = dispatch => {
  return {
    getData: (cb) => {
      httprequest('/getData').then((e) => {
        dispatch(fetchData(e))
        cb(e)
      })
    },
    changeData: (key,target) => {
      console.log(key)
      dispatch(changeData(key,target))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable)
