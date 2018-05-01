import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: '', isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}

//action
function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return {type: ERROR_MSG, msg}
}

export function register({user, pwd, repeatPwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (repeatPwd !== pwd) {
        return errorMsg('两次密码不同')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}