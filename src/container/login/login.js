import React from 'react'
import Logo from '../../components/logo/logo'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import imoocForm from '../../components/imooc-form/imooc-form'

@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component {
    register() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== '/login') ?
                    <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            type='text'
                            onChange={v => this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <Button type='primary'
                            onClick={() => this.handleLogin()}
                    >登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={() => this.register()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login