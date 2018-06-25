import React from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../narlink/navlink'
import Boss from '../../components/boss/boss'
import Genius from '../../components/genius/genius'
import User from '../../components/user/user'
import Msg from '../../components/message/message'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

// function Msg() {
//     return <h1>Msg</h1>
// }

@connect(
    state => state,
    {getMsgList, recvMsg}
)

class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'boss',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            }
        ]
        return (
            <div>
                <NavBar className="fixed-header">
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
                <div className="page-content">
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard