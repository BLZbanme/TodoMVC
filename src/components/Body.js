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

    completeItem(index) {
        let todoList = Array.from(this.state.todoList); 
        todoList[index].done = !todoList[index].done;
        this.setState({
            todoList
        })
    }

    deleteItem(index) {
        let todoList = Array.from(this.state.todoList); 
        todoList.splice(index, 1);
        this.setState({
            todoList
        })
    }

    changeItem(newItem) {
        let todoList = Array.from(this.state.todoList); 
        todoList[newItem.index] = newItem;
        this.setState({
            todoList
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
                    onCompleted={(value) => {this.completeItem(value)}}
                    onDelete={(value) => {this.deleteItem(value)}}
                    onChange={(newItem) => {this.changeItem(newItem)}}
                />
            </section>
        )
    }
}

export default Body;