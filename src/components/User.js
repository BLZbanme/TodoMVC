import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authCode: ""
        }
    }

    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    changeAuthCode(e) {
        this.setState({
            authCode: e.target.value
        })
    }

    login() {
        console.log('1111', 111);
        this.props.sendAction(this.state.username, this.state.password, this.state.authCode);
    }

    changeImgSrc(e) {
        e.target.src = `http://localhost:3000/getAuthCode?${Math.random()}`;
    }

    renderWarn() {
        if (this.props.loginWrong) {
            return (
                div
            )
        }
    }

    render() {
        return (
            <div className="user-form">
               <form>
                    <div>
                        <input 
                            type='text' 
                            placeholder="账号"
                            id="login-username"
                            maxLength='11'
                            value={this.state.username}
                            onChange={(e) => this.changeUsername(e)}
                        />
                    </div>
                    <div>
                        <input 
                            type='password' 
                            placeholder="密码"
                            id="login-password"
                            maxLength='11'
                            value={this.state.password}
                            onChange={(e) => this.changePassword(e)}
                        />
                    </div>
                    <div className='authCode-div'>
                        <input 
                            type='text' 
                            placeholder="验证码"
                            id="login-authCode"
                            maxLength='4'
                            value={this.state.authCode}
                            onChange={(e) => this.changeAuthCode(e)}
                        />
                        <img onClick={(e) => this.changeImgSrc(e)} src="http://localhost:3000/getAuthCode" />
                    </div>
                    
                    {
                        this.renderWarn()
                    }

                    <div className="user-button">
                        <button onClick={() => this.login()}>
                            登录
                        </button>
                        <button className="button-register">
                            注册
                        </button>
                    </div>
                </form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('user-state', state);
    return {
        isLogin: state.isLogin,
        loginWrong: state.loginWrong,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        sendAction: (username, password, authCode) => {
            dispatch({
                type: 'login',
            })

            const promise = new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true;
                const result = axios({
                    url: "/login",
                    method: "POST",
                    data: {
                        username, 
                        password,
                        authCode
                    }
                })

                result.then(
                    res => {
                        dispatch({
                            type: 'login_success',
                            data: res.data
                        })
                        console.log('res', res);
                        setCookie('jwt', res.data.token, 1);
                        setCookie('username', res.data.username, 1);
                        resolve(res);
                    },
                    err => {
                        dispatch({
                            type: 'login_fail',
                            data: { error: err }
                        })
                        reject(err);
                    }
                )
            })

            return promise;
        }
    }
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
