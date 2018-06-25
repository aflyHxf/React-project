import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank size="lg">
                {this.props.userList.map(v => (
                    v.avatar ? (
                        <div key={v._id}>
                            <WhiteSpace size="lg"/>
                            <Card
                                onClick={() => {
                                    this.handleClick(v)
                                }}>
                                <Header
                                    title={v.user}
                                    thumb={<img width='50' src={require(`../img/${v.avatar}.png`)} alt=""/>}
                                    extra={<span>{v.title}</span>}
                                />
                                <Body>{v.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
                                {v.type === 'boss' ? <div>薪资：{v.salary}</div> : null}
                                </Body>
                            </Card>
                            <WhiteSpace size="lg"/>
                        </div>) : null
                ))}
            </WingBlank>)
    }
}

export default UserCard