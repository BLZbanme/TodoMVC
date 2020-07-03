import React from "react";

class BodyFooter extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <footer  className="footer">
                <span className="todo-count">
                    {
                        `${this.props.todoList.filter(e => !e.done).length} items left`
                    }
                </span>
                <ul className="filters-ul">
                    <li><a className={this.props.hash === '' ? "selected" : ""} href="#/">All</a></li>
                    <li><a className={this.props.hash === 'active' ? "selected" : ""} href="#/active">Active</a></li>
                    <li><a className={this.props.hash === 'completed' ? "selected" : ""} href="#/completed">Completed</a></li>
                </ul>
                {
                    this.props.todoList.some(e => e.done) &&
                    <button 
                        className="clear-completed"
                        onClick={() => this.props.onDeleteAll()}
                    >
                        Clear completed
                    </button>
                }
            </footer>
        )
    } 
}

export default BodyFooter;