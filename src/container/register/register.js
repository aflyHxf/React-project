import React from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo'
import {List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'genuis'
        }
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleRegister() {
        this.props.register(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>这是注册页</h2>
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v => this.handleChange('user', v)}
                    > 用户名 </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.handleChange('repeatPwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genuis'}
                               onChange={v => this.handleChange('type', 'genuis')}
                    >牛人</RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}
                               onChange={v => this.handleChange('type', 'boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary"
                            onClick={() => this.handleRegister()}
                    >注册</Button>
                </List>
            </div>
        )
    }
}

export default Register