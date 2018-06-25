import React from 'react'
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types'

const avatarArr = '1,2,3,4,5,6,7,8,9,10,11,12'.split(',')
const avatarList = avatarArr.map(v => ({
    icon: require(`../img/${v}.png`),
    text: v,
}));

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const gridHeader = this.state.icon ? (
            <div>
                <span>已选择头像</span>
                <img src={this.state.icon} width='20' alt=""/>
            </div>
        ) : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList}
                          onClick={elm => {
                              this.setState(elm)
                              this.props.selectAvatar(elm.text)
                          }}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector