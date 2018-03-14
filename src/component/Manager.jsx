import React,{Component} from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom'
import { openMenu } from '../action/open-menu'
const { Header, Sider, Content,Card } = Layout

class Manager extends React.Component {
    constructor(props){
        super(props)
    }
    toggle = () => {
        this.props.dispatch(openMenu(!this.props.open))
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.props.open}
                >
                    <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span>订单管理</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span>管理员信息管理</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span>历史记录管理</span>
                            </Menu.Item>
                        </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                          className="trigger"
                          type={this.props.open ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: 'inherit', minHeight: 280 }}>
                      {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

function select(state) {
    return {
        open: state.OpenMenu,
    }
}

export default connect(select)(Manager)
