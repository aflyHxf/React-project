import React from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo'
import {List, InputItem, WhiteSpace, Radio, Button, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import imoocForm from '../../components/imooc-form/imooc-form'

@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends React.Component {
    handleRegister() {
        this.props.register(this.props.state)
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v => this.props.handleChange('user', v)}
                    > 用户名 </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.props.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.props.handleChange('repeatPwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type === 'genius'}
                               onChange={v => this.props.handleChange('type', 'genius')}
                    >牛人</RadioItem>
                    <RadioItem checked={this.props.state.type === 'boss'}
                               onChange={v => this.props.handleChange('type', 'boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace/>
                    <WingBlank>
                        <Button type="primary"
                                onClick={() => this.handleRegister()}
                        >注册</Button>
                    </WingBlank>
                </List>
            </div>
        )
    }
}

export default Register