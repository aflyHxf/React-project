import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from "../../redux/chatuser.redux";
import UserCard from '../../components/usercard/usercard'

@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return <UserCard userList={this.props.userList}>
        </UserCard>
    }
}

export default Genius