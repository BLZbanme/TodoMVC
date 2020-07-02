import React from "react";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <div>
                    <input 
                        className="toggle-input"
                        type="checkbox"
                    />
                    <label>{this.props.item.value}</label>
                    <button className="destroy"></button>
                </div>
                <input className="edit-input"/>
            </li>
        )
    }
}

export default TodoItem;