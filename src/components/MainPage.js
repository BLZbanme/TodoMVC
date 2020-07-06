import React from "react";
import Header from "./Header";
import Body from "./Body";

import { connect } from 'react-redux';

import User from './User';

class MainPage extends React.Component {

    constructor(props) {
        super(props) ;
        this.redirectHash = this.redirectHash.bind(this);
    }

    redirectHash() {
        if (!location.hash) {
            location.hash = '/';
        }
    }

    componentDidMount() {
        window.addEventListener("load", this.redirectHash);
    }

    componentWillUnmount() {
        window.addEventListener("load", this.redirectHash);
    }

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
    return {
        isLogin: state.isLogin
    };
}

export default connect(mapStateToProps)(MainPage);