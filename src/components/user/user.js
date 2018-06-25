import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)

class User extends React.Component {
    logout() {
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗???', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确认', onPress: () => {
                browserCookies.erase('userId')
                this.props.logoutSubmit()
            }
            },
        ])
    }

    render() {
        const props = this.props
        const Item = List.Item;
        const Brief = Item.Brief;

        return props.user ? (
            <div>
                <Result
                    img={<img width={50} src={require(`../img/${this.props.avatar}.png`)} alt=""/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.salary ? <Brief>薪资：{props.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={() => this.logout()}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}></Redirect>
    }
}

export default User