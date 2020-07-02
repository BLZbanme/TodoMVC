import React from "react";


class TheInput extends React.Component {

    constructor(props) {
        super(props);
    }

    onKeyPress(e) {
        //input的监听键盘事件
        if (e.charCode === 13) {
            let value = e.target.value;
            if (value) {
                this.props.valueInput(value);
            }
        }
    }

    render() {
        return (
            <input className="the-input"
                type="text"
                placeholder="What needs to be done?"
                onKeyPress={(e) => this.onKeyPress(e)}
            ></input>
        )
    }
}

export default TheInput;