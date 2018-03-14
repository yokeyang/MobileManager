import React,{Component} from 'React'
import {Row,Col,Card,Icon,Progress} from 'antd'
import DataTable from './DataTable'

class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      percent:10,
      all:0,
      doing:0,
      finish:0,
      waiting:0
    }
  }
  render(){
    return(
      <Row gutter={10}>
        <Col className="gutter-row" md={4}>
            <div className="gutter-box">
                <Card bordered={false}>
                    <div className="clear y-center">
                        <div className="pull-left mr-m">
                          <Icon type="area-chart" className="text-2x text-danger" />
                        </div>
                        <div className="clear">
                          <div className="text-muted">订单总数</div>
                          <h2>{this.state.all}</h2>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="gutter-box">
                <Card bordered={false}>
                    <div className="clear y-center">
                        <div className="pull-left mr-m">
                          <Icon type="loading" className="text-2x" />
                        </div>
                        <div className="clear">
                            <div className="text-muted">正在打印</div>
                            <h2>{this.state.doing}</h2>
                        </div>
                    </div>
                </Card>
            </div>
        </Col>
        <Col className="gutter-row" md={4}>
            <div className="gutter-box">
                <Card bordered={false} onClick = {()=>{console.log("hello")}}>
                    <div className="clear y-center">
                        <div className="pull-left mr-m">
                            <Icon type="check-circle" className="text-2x text-info" />
                        </div>
                        <div className="clear">
                          <div className="text-muted">打印完成</div>
                          <h2>{this.state.finish}</h2>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="gutter-box">
                <Card bordered={false}>
                    <div className="clear y-center">
                        <div className="pull-left mr-m">
                          <Icon type="clock-circle" className="text-2x text-success" />
                        </div>
                        <div className="clear">
                          <div className="text-muted">待打印</div>
                          <h2>{this.state.waiting}</h2>
                        </div>
                    </div>
                </Card>
            </div>
        </Col>
        <Col className="gutter-row" md={8}>
            <div className="gutter-box">
                <Card bordered={false} className={'no-padding'}>
                  <div className="clear y-center">
                      <div className="pull-left mr-m">
                        <Icon type="clock-circle-o" className="text-2x text-success" />
                      </div>
                      <div className="clear">
                        <div className="text-muted">第一步</div>
                        <h2>取手机壳</h2>
                      </div>
                      <div className="clear y-right">
                        <Progress type="circle" percent={this.state.percent} />
                      </div>
                  </div>
                </Card>
            </div>
        </Col>
        <Col className="gutter-row" md={8}>
            <div className="gutter-box">
                <Card bordered={false} title="打印具体状态" className={'no-padding'} style = {{height:'28vh'}}>
                  <p>打印出现错误</p>
                  <p>错误位置 打印机</p>
                  <p>打印机缺墨</p>
                  <p>打印已停止</p>
                </Card>
            </div>
        </Col>
        <Col className = "gutter--row" md={24}>
          <DataTable
            all = {(all)=>{this.setState({all})}}
            doing = {(doing)=>{this.setState({doing})}}
            finish = {(finish)=>{this.setState({finish})}}
            waiting = {(waiting)=>{this.setState({waiting})}}
          />
        </Col>
    </Row>
    )
  }
}
export default Dashboard
