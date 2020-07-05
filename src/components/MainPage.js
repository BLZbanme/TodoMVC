import React from "react";
import Header from "./Header";
import Body from "./Body";

import { connect } from 'react-redux';

import User from './User';

class MainPage extends React.Component {

    render() {
        return (
            <div className="main-page">
                <Header />
                { 
                    this.props.isLogin ? <Body /> : <User />
                }                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('user-state', state);
    return {
        isLogin: state.isLogin
    };
}

export default connect(mapStateToProps)(MainPage);