import React from "react";
import TodoItem from "./TodoItem";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderItem(item, index) {

        if (this.props.hash == 'active') {
            if (item.done) {
                return;
            }
        }
        else if (this.props.hash == 'completed') {
            if (!item.done) {
                return;
            }
        }

        return (
            <TodoItem 
                onCompleted={
                    (value) => {this.props.onCompleted(value)}
                }
                onDelete={
                    (value) => {this.props.onDelete(value)}
                }
                onChange={
                    (newItem) => {this.props.onChange(newItem)}
                }
                key={index} 
                index={index}
                item={item}     
            />
        )
    }

    render() {
        return (
            <section className="todolist-main">
                <input 
                    id="toggle-all" 
                    className="toggle-all" 
                    type="checkbox" 
                    checked= {
                        this.props.todoList.length && this.props.todoList.every(e => e.done)
                    }
                    onChange={() => this.props.onCompleteAll()}
                />
                <label htmlFor="toggle-all" >
                    Mark all as complete
                </label>
                <ul className="todolist-ui">
                    {
                        this.props.todoList.map((item, index) => {
                            return this.renderItem(item, index);
                        })
                    }
                </ul>
            </section>
        )
    }
}

export default TodoList;