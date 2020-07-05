import React from "react";
import TheInput from "./TheInput";
import TodoList from "./TodoList";
import BodyFooter from "./BodyFooter";
import UserInfo from './UserInfo';
import { connect } from 'react-redux';
import axios from 'axios';
import docCookies from '../utils/docCookies';
import store from "../store";

let storeCallBack;

class Body extends React.Component {

    constructor(props) {
        super(props);
        // let storage = localStorage.getItem('todoList');

        // let todoList = [];
        // if (storage) {
        //     todoList = JSON.parse(storage);
        // }   


        let hash = (location.hash || '').split('\#\/')[1];

        this.props.getList();

        this.state = {
            todoList: props.todolist || [],
            hash
        }

        // this.state = {
        //     todoList,
        //     hash
        // }

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
        
        storeCallBack = store.subscribe(() => {

            let todoList = store.getState().todoList;
            if (todoList && todoList.length) {
                if (typeof todoList === 'string') {
                    todoList =  JSON.parse(todoList);
                }
                this.setState({
                    todoList
                })
            }
        })
        
    }

    componentWillUnmount() {
        window.addEventListener("load", this.redirectHash);
        window.removeEventListener("beforeunload", this.setStorage);
        window.removeEventListener("hashchange", this.handleHashChange);
        storeCallBack(); 
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

    saveAll() {
        console.log('保存所有开始');
        console.log('this.state.todoList', this.state.todoList);
        this.props.saveAll(this.state.todoList);
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
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolist: state.todolist || []
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveAll: (todolist) => {
            dispatch({
                type: 'save'
            })

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
            dispatch({
                type: 'getList',
            })

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