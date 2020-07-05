import docCookies from '../utils/docCookies';

console.log('jwt', docCookies.getItem('jwt'));

const initalValue = {
    isLogin: docCookies.getItem('jwt') ? true : false,
    username: docCookies.getItem('username') || "",
    todoList: [],
    loginWrong: false
}

const reducer = (state = initalValue, action) => {
    console.log('action', action);
    switch (action.type) {
        case "login": 
            return state;
        case "login_success":
            return {
                ...state,
                isLogin: true,
                username: action.data.username
            }
        case "login_fail":
            return {
                ...state,
                isLogin: false,
                loginWrong: true
            }

        case "save": 
            return state;
        case "save_success":
            console.log('save_success', action);
            return {
                ...state,
                todoList: action.data.todolist
            }
        case "save_fail":
            console.log('save_fail', action);
            return {
                ...state
            }

        case "getList": 
            return state;
        case "getList_success":
            console.log('getList_success', action);
            return {
                ...state,
                todoList: action.data.todolist
            }
        case "getList_fail":
            console.log('getList_fail', action);
            return {
                ...state
            }            
        default:
            return state;
    }
}

export default reducer;