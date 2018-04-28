import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd-mobile'
import axios from 'axios'
import './config.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        axios.get('/data').then(res => {
            if (res.status === 200) {
                this.setState({data: res.data})
                console.log(res)
            }
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Button type="primary">Welcome to React</Button>
                </header>
                <h2>我的名字是{this.state.data.name}</h2>
            </div>
        );
    }
}

export default App;
