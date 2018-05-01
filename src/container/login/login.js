import React from 'react'
import Logo from '../../components/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends React.Component {
    register() {
        console.log(this.props);
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                    </List>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={() => this.register()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login