import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import md5 from 'js-md5';


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            invitCode: "",
            authCode: ""
        }
    }

    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
        this.props.removeWarn();
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
        this.props.removeWarn();
    }

    changeAuthCode(e) {
        this.setState({
            authCode: e.target.value
        })
        this.props.removeWarn();
    }

    changeInvitCode(e) {
        this.setState({
            invitCode: e.target.value
        })
        this.props.removeWarn();
    }

    checkFormat() {
        if (!this.state.username || this.state.username.length > 11  || this.state.username.length < 6) {
            this.props.addWarn('用户名必须大于5位，小于11位');
            return false;
        }
        if (!this.state.password || this.state.password.length > 11  || this.state.password.length < 6) {
            this.props.addWarn('密码必须大于5位，小于11位');
            return false;
        }
        if (!this.state.authCode || this.state.authCode.length != 4) {
            this.props.addWarn('验证码必须4位');
            return false;
        }
        return true;
    }

    login() {
        if (this.checkFormat()) {
            this.props.loginAction(this.state);
        }
    }

    register() {
        if (this.checkFormat()) {
            this.props.registerAction(this.state);
        }
    }

    changeImgSrc(e) {
        e.target.src = `/getAuthCode?${Math.random()}`;
    }

    renderWarn() {
        if (this.props.loginMessage) {
            return (
                <div className={this.props.registerSucces ? 'success-div' : 'warn-div'}>
                    <p>
                        {this.props.loginMessage}
                    </p>
                </div>
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
                            minLength='6'
                            value={this.state.username}
                            onChange={(e) => this.changeUsername(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <input 
                            type='password' 
                            placeholder="密码"
                            id="login-password"
                            maxLength='11'
                            minLength='6'
                            value={this.state.password}
                            onChange={(e) => this.changePassword(e)}
                        />
                    </div>
                    <div className='invitCode-div'>
                        <input 
                            type='text' 
                            placeholder="邀请码(登录无须填写)"
                            id="login-invitCode"
                            maxLength='11'
                            
                            value={this.state.invitCode}
                            onChange={(e) => this.changeInvitCode(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className='authCode-div'>
                        <input 
                            type='text' 
                            placeholder="验证码"
                            id="login-authCode"
                            length='4'
                            value={this.state.authCode}
                            onChange={(e) => this.changeAuthCode(e)}
                            autoComplete="off"
                        />
                        <img onClick={(e) => this.changeImgSrc(e)} src="/getAuthCode" />
                    </div>
                    
                    {
                        this.renderWarn()
                    }

                    <div className="user-button">
                        <button type="button" onClick={() => this.login()}>
                            登录
                        </button>
                        <button type="button" className="button-register" onClick={() => this.register()}>
                            注册
                        </button>
                    </div>
                </form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        loginMessage: state.loginMessage,
        registerSucces: state.registerSucces
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginAction: (obj) => {

            const { username, password, authCode } = obj;

            const promise = new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true;
                const result = axios({
                    url: "/login",
                    method: "POST",
                    data: {
                        username,
                        password: md5(password),
                        authCode
                    }
                })

                result.then(
                    res => {
                        setCookie('jwt', res.data.token, 1);
                        setCookie('username', res.data.username, 1);
                        dispatch({
                            type: 'login_success',
                            data: res.data
                        })
                        
                        resolve(res);
                    },
                    err => {
                        dispatch({
                            type: 'login_fail',
                            err
                        })
                        reject(err);
                    }
                )
            })

            return promise;
        },
        registerAction: (obj) => {

            const { username, password, invitCode, authCode } = obj;
            const promise = new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true;
                const result = axios({
                    url: "/register",
                    method: "POST",
                    data: {
                        username, 
                        password: md5(password),
                        invitCode,
                        authCode
                    }
                })

                result.then(
                    res => {
                        dispatch({
                            type: 'register_success',
                            data: res.data
                        })
                        resolve(res);
                    },
                    err => {
                        dispatch({
                            type: 'register_fail',
                            err
                        })
                        reject(err);
                    }
                )
            })

            return promise;
        },
        removeWarn: () => {
            dispatch({
                type: 'removeWarn'
            })     
        },
        addWarn: (loginMessage) => {
            dispatch({
                type: 'addWarn',
                data: {
                    loginMessage
                }
            })     
        }
    }
}

function setCookie(key, value, exHour) {
    let now = new Date();
    now.setTime(now.getTime() + (exHour * 60  *60 * 1000));
    let expires = "expires=" + now.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
