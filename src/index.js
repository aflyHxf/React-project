import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/auth-route/authroute'
import Dashboard from './components/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './components/chat/chat'
import reducers from './reducer'
import './config.js'
import './index.css'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))


ReactDOM.render(
    (<Provider store={store}>
        <Router>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </Router>
    </Provider>),
    document.getElementById('root'));
