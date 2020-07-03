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
                    <li><a>All</a></li>
                    <li><a>Active</a></li>
                    <li><a>Completed</a></li>
                </ul>
                <button 
                    className="clear-completed"
                    onClick={() => this.props.onDeleteAll()}
                >
                    Clear completed
                </button>
            </footer>
        )
    }
}

export default BodyFooter;