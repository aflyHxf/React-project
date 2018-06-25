import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../redux/util'

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: []}
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: '', showEmoji: false})
    }

    render() {
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        const Item = List.Item
        if (!users[userid]) {
            return null
        }
        const chatId = getChatId(userid, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
        const emojiList = '😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍 😀 😁 😁 🤣 🤷 😂 😍'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))
        return (
            <div id="chat-page">
                <NavBar mode="dark"
                        icon={<Icon type="left" size="lg"/>}
                        onLeftClick={() => {
                            this.props.history.goBack()
                        }}
                >{users[userid].name}</NavBar>
                {chatmsg.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item className="chat-me"
                                  extra={<img src={avatar} alt=""/>}>
                                {v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={(v) => {
                                this.setState({text: v})
                            }}
                            extra={<div>
                                <span style={{marginRight: 15}}
                                      onClick={() => {
                                          this.setState({showEmoji: !this.state.showEmoji})
                                          this.fixCarousel()
                                      }}
                                      role="img"
                                      aria-label="img"
                                > 😀 </span>
                                <span onClick={() => {
                                    this.handleSubmit()
                                }}>发送</span>
                            </div>}>
                        </InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emojiList}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    /> : null}
                </div>
            </div>
        )
    }
}

export default Chat