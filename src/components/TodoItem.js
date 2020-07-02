import React from "react";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hideInput: true
        }
    }

    completeItem() {
        this.props.onCompleted(this.props.index);
    }

    deleteItem() {
        this.props.onDelete(this.props.index);
    }

    showInput() {
        this.setState({
            hideInput: false
        })
    }

    changeItem(e) {
        console.log(e);
    }

    render() {
        return (
            <li 
                className={
                    `
                        ${this.props.item.done ? "completed" : ""} 
                        ${this.state.hideInput ? "" : "editing"}
                    `
                }>
                <div className="view">
                    <input 
                        className="toggle-input"
                        type="checkbox"
                        onClick={() => this.completeItem()}
                    />
                    <label
                        onDoubleClick={() => this.showInput()}
                    >
                        {this.props.item.value}
                    </label>
                    <button 
                        className="destroy"
                        onClick={() => this.deleteItem()}
                    >
                    </button>
                </div>
                <input className="edit-input"
                    value={this.props.item.value}
                    onChange={this.changeItem}
                    onBlur={this.changeItem}
                />
            </li>
        )
    }
}

export default TodoItem;