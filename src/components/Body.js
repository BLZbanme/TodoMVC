import React from "react";
import TheInput from "./TheInput";
import TodoList from "./TodoList";
import BodyFooter from "./BodyFooter";
import UserInfo from './UserInfo';
import { connect } from 'react-redux';
import axios from 'axios';
import docCookies from '../utils/docCookies';

class Body extends React.Component {

    constructor(props) {
        super(props);

        let hash = (location.hash || '').split('\#\/')[1];

        this.state = {
            hash
        }

        this.setStorage = this.setStorage.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
    }

    setStorage(e) {
        localStorage.setItem('todoList', JSON.stringify(this.props.todoList));
    }

    handleHashChange() {     
        let hash = (location.hash || '').split('\#\/')[1];
        this.setState({
            hash
        })
    }

    componentDidMount() {
        this.props.getList();
        window.addEventListener("beforeunload", this.setStorage);
        window.addEventListener("hashchange", this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.setStorage);
        window.removeEventListener("hashchange", this.handleHashChange);
    }

    handleValueInput(value) {
        let newArray = this.props.todoList;
        newArray.push({
            value,
            done: false
        })
        this.props.saveAll(newArray);
        this.setState({})
    }

    completeItem(index) {
        let todoList = Array.from(this.props.todoList); 
        todoList[index].done = !todoList[index].done;
        this.props.saveAll(todoList);
    }

    deleteItem(index) {
        let todoList = Array.from(this.props.todoList); 
        todoList.splice(index, 1);
        this.props.saveAll(todoList);
    }

    changeItem(newItem) {
        let todoList = Array.from(this.props.todoList); 
        todoList[newItem.index] = {
            value: newItem.value,
            done: false
        };
        this.props.saveAll(todoList);
    }

    deleteAll() {
        const filterArray = this.props.todoList.filter(e => !e.done);
        this.props.saveAll(filterArray);
    }

    completeAll() {
        let tmpTodoList;
        if (this.props.todoList.every(e => e.done)) {
            tmpTodoList = this.props.todoList.map(e => {
                e.done = false;
                return e;
            })
        }
        else {
            tmpTodoList = this.props.todoList.map( e => {
                e.done = true;
                return e;
            })
        }
        this.props.saveAll(tmpTodoList);
    }

    saveAll() {
        this.props.saveAll(this.props.todoList);
    }

    render() {
        return (
            <>
                <UserInfo onClick={() => this.saveAll()} />
                <section className="body-section">
                    <TheInput 
                        valueInput={(value) => {this.handleValueInput(value)}}
                    />
                    <TodoList 
                        todoList={this.props.todoList}
                        onCompleted={(value) => {this.completeItem(value)}}
                        onDelete={(value) => {this.deleteItem(value)}}
                        onChange={(newItem) => {this.changeItem(newItem)}}
                        onCompleteAll={() => {this.completeAll()}}
                        hash={this.state.hash}
                    />
                    {
                        this.props.todoList.length > 0 && 
                        <BodyFooter 
                            todoList={this.props.todoList}
                            onDeleteAll={() => {this.deleteAll()}}
                            hash={this.state.hash}
                        /> 
                    }
                </section>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveAll: (todolist) => {

            const promise = new Promise((resolve, reject) => {
                const result = axios({
                    url: "/updateList",
                    method: "POST",
                    data: {
                        todolist: JSON.stringify(todolist)
                    },
                    headers: {'Authorization': docCookies.getItem('jwt')}
                })

                result.then(
                    res => {
                        dispatch({
                            type: 'save_success',
                            data: {
                                todolist
                            }
                        })

                        resolve(res);
                    },
                    err => {
                        dispatch({
                            type: 'save_fail',
                            data: { error: err }
                        })

                        reject(err);
                    }
                )
            })

            return promise;
        },
        getList: () => {

            const promise = new Promise((resolve, reject) => {
                const result = axios({
                    url: "/getList",
                    method: "GET",
                    headers: {'Authorization': docCookies.getItem('jwt')}
                })

                result.then(
                    res => {
                        dispatch({
                            type: 'getList_success',
                            data: res.data
                        })

                        resolve(res);
                    },
                    err => {
                        dispatch({
                            type: 'getList_fail',
                            data: { error: err }
                        })

                        reject(err);
                    }
                )
            })

            return promise;
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Body);