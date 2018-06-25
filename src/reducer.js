//合并所以reducer 并返回
import {combineReducers} from 'redux'
import {user} from './redux/user.redux'
import {chatUser} from "./redux/chatuser.redux";
import {chat} from "./redux/chat.redux";

export default combineReducers({user, chatUser, chat})