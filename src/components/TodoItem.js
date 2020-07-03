import React from "react";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hideInput: true,
            value: props.item.value
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
        this.setState({
            value: e.target.value
        })
    }

    changeItemValue(e) {

        let value = e.target.value;

        if (!value) {
            this.deleteItem();
            
        }
        else {
            let index = this.props.index;
            this.props.onChange({
                index,
                value: value
            })
        }

        this.setState({
            hideInput: true
        })
    }

    handleEnter(e) {
        if (e.charCode === 13) {
            this.changeItemValue(e);
        }
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
                    value={this.state.value}
                    onChange={(e) => this.changeItem(e)}
                    onBlur={(e) => {this.changeItemValue(e)}}
                    onKeyPress={(e) => this.handleEnter(e)}
                />
            </li>
        )
    }
}

export default TodoItem;