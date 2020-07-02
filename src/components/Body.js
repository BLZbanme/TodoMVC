import React from "react";
import TheInput from "./TheInput";
import TodoList from "./TodoList";


class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
    }

    handleValueInput(value) {
        let newArray = this.state.todoList;
        console.log('handleValueInput', value);
        newArray.push({
            value,
            done: false
        })
        this.setState({
            todoList: newArray
        })
    }

    render() {
        return (
            <section className="body-section">
                <TheInput
                    valueInput={(value) => {this.handleValueInput(value)}}
                />
                <TodoList 
                    todoList={this.state.todoList}
                />
            </section>
        )
    }
}

export default Body;