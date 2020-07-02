import React from "react";
import Header from "./Header";
import Body from "./Body";

class MainPage extends React.Component {

    render() {
        return (
            <div className="main-page">
                <Header />
                <Body />
            </div>
        )
    }
}

export default MainPage;