import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.includes(pathname)) {
            return false
        }
        //获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息的
                } else {
                    this.props.history.push('/login')
                }
            }
        })
        //是否登录
        //现在的url地址 login是不需要的跳转的
        //用户的type 身份是boss 还是牛人
        // 用户是否完善信息（选择头像  个人简历）
    }

    render() {
        return (
            null
        )
    }
}

export default AuthRoute