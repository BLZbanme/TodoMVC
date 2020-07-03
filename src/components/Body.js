import React from "react";
import TheInput from "./TheInput";
import TodoList from "./TodoList";
import BodyFooter from "./BodyFooter";

//此全局变量存储beforeunload事件的函数

class Body extends React.Component {

    constructor(props) {
        super(props);
        let storage = localStorage.getItem('todoList');

        let todoList = [];
        if (storage) {
            todoList = JSON.parse(storage);
        }   

        let hash = (location.hash || '').split('\#\/')[1];

        this.state = {
            todoList,
            hash
        }

        this.redirectHash = this.redirectHash.bind(this);
        this.setStorage = this.setStorage.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
    }

    redirectHash() {
        if (!location.hash) {
            location.hash = '#/';
        }
    }

    setStorage() {
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
    }

    handleHashChange() {     
        let hash = (location.hash || '').split('\#\/')[1];
        this.setState({
            hash
        })
    }

    componentDidMount() {
        window.addEventListener("load", this.redirectHash);
        window.addEventListener("beforeunload", this.setStorage);
        window.addEventListener("hashchange", this.handleHashChange);
    }

    componentWillUnmount() {
        window.addEventListener("load", this.redirectHash);
        window.removeEventListener("beforeunload", this.setStorage);
        window.removeEventListener("hashchange", this.handleHashChange);
    }

    handleValueInput(value) {
        let newArray = this.state.todoList;
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
        todoList[newItem.index] = {
            value: newItem.value,
            done: false
        };
        this.setState({
            todoList
        })
    }

    deleteAll() {
        const filterArray = this.state.todoList.filter(e => !e.done);
        this.setState({
            todoList: filterArray
        })
    }

    completeAll() {
        let tmpTodoList;
        if (this.state.todoList.every(e => e.done)) {
            tmpTodoList = this.state.todoList.map(e => {
                e.done = false;
                return e;
            })
        }
        else {
            tmpTodoList = this.state.todoList.map( e => {
                e.done = true;
                return e;
            })
        }

        this.setState({
            todoList: tmpTodoList
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
                    onCompleteAll={() => {this.completeAll()}}
                    hash={this.state.hash}
                />
                {
                    this.state.todoList.length > 0 && 
                    <BodyFooter 
                        todoList={this.state.todoList}
                        onDeleteAll={() => {this.deleteAll()}}
                        hash={this.state.hash}
                    /> 
                }
                
            </section>
        )
    }
}

export default Body;