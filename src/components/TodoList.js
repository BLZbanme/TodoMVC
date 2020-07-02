import React from "react";
import TodoItem from "./TodoItem";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="todolist-main">
                <ul className="todolist-ui">
                    {
                        this.props.todoList.map((item, index) => {
                            return (
                                <TodoItem 
                                    key={index} 
                                    item={item}     
                                />
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}

export default TodoList;