import React from "react";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHiden: true
        }
        //该ref属性用于找到组件中双击后显示的input
        this.myInput = React.createRef();
    }

    componentDidUpdate() {
        //双击后的input自动获取焦点
        if (!this.state.isHiden) {
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
            isHiden: false
        })
    }

    changeItem(e) {
        this.props.onChange({
            index: this.props.index,
            value: e.target.value
        })
    }

    hidenInput(e) {
        if (!e.target.value) {
            this.deleteItem();
        }
        this.setState({
            isHiden: true
        })
    }

    handleEnter(e) {
        //很奇怪，onKeyPress监听不到esc键，改成keyDown
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.hidenInput(e);
        }
    }

    render() {
        return (
            <li 
                className={
                    `${this.props.item.done ? "completed" : ""} ${this.state.isHiden ? "" : "editing"}`
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
                    value={this.props.item.value}
                    onChange={(e) => this.changeItem(e)}
                    onBlur={(e) => {this.hidenInput(e)}}
                    onKeyDown={(e) => this.handleEnter(e)}
                />
            </li>
        )
    }
}

export default TodoItem;