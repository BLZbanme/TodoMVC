import React, { Component } from 'react'
import { connect } from 'react-redux';
import docCookies from '../utils/docCookies';

class UserInfo extends Component {

    clearCookie() {
        console.log('开始清除');
        docCookies.removeItem('jwt');
        docCookies.removeItem('username');
        location.reload();
    }

    render() {
        return (
            <div className="user-info">
                <span>
                    用户：{this.props.username}
                </span>
                <div>
                    <button onClick={() => this.props.onClick()}>
                        保存
                    </button>
                    <button onClick={() => this.clearCookie()}>
                        退出
                    </button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('user-state', state);
    return {
        username: state.username
    };
}

export default connect(mapStateToProps)(UserInfo);