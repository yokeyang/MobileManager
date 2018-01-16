import React from 'react'
import { Table, Icon, Form, Divider, Input, Popconfirm,Modal } from 'antd'
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
      bordered: false,
      loading: false,
      pagination: true,
      title:() => {return true},
      showHeader,
      rowSelection: {},
      scroll: undefined,
      data:[],
      selectedRowKeys:[]
    }
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
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
    this.ChangeStatue(this.state.data)
  }
  handleDelete = (key) => {
    console.log(key)
  }
  handlePrint = (key) =>{
    console.log(key)
  }
  edit = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
    this.ChangeStatue(this.state.data)
  }
  save = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
    this.ChangeStatue(this.state.data)
  }
  cancel = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
    this.ChangeStatue(this.state.data)
  }
  ChangeStatue = (data) =>{
    this.props.all(data.length)
    this.props.waiting(data.filter((item) => {return item.finish == 0}).length)
    this.props.doing(data.filter((item) => {return item.finish == 2}).length)
    this.props.finish(data.filter((item) => {return item.finish == 1}).length)
  }
  componentDidMount = () =>{
    fetch('/getData',{
      method:'post'
    }).then((response) => {
      response.json().then((datas) => {
        datas.datas.map((item) => {
          item.key = item.id
        })
        this.setState({data:datas.datas})
        this.cacheData = datas.datas.map(item => ({ ...item }))
        this.ChangeStatue(this.state.data)
      })
    })
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
        <Table {...this.state} rowSelection={rowSelection} columns={this.columns} dataSource={this.state.data} />
      </div>
    );
  }
}
export default DataTable
