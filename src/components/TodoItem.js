import React from "react";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hideInput: true,
            value: props.item.value
        }
        //该ref属性用于找到组件中双击后显示的input
        this.myInput = React.createRef();
    }

    componentDidUpdate() {
        //双击后的input自动获取焦点
        if (!this.state.hideInput) {
            this.myInput.current.focus();
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
        //很奇怪，onKeyPress监听不到esc键，改成keyDown
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.changeItemValue(e);
        }
    }

    render() {
        return (
            <li 
                className={
                    `${this.props.item.done ? "completed" : ""} ${this.state.hideInput ? "" : "editing"}`
                }>
                <div className="view">
                    <input 
                        className="toggle-input"
                        type="checkbox"
                        checked={this.props.item.done}
                        onChange={() => this.completeItem()}
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
                    ref={this.myInput}
                    value={this.state.value}
                    onChange={(e) => this.changeItem(e)}
                    onBlur={(e) => {this.changeItemValue(e)}}
                    onKeyDown={(e) => this.handleEnter(e)}
                />
            </li>
        )
    }
}

export default TodoItem;