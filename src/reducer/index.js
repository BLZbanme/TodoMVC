import docCookies from '../utils/docCookies';

const initalValue = {
    isLogin: docCookies.getItem('jwt') ? true : false,
    username: docCookies.getItem('username') || "",
    todoList: [],
    loginMessage: '',
    registerSucces: ''
}

const reducer = (state = initalValue, action) => {
    console.log('action', action);
    switch (action.type) {
        case "addItem":

            let todoList = Array.from(state.todoList);
            todoList.push({
                value: action.data.value,
                done: false
            })
            return {
                ...state,
                todoList
            }

        case "removeWarn":
            return {
                ...state,
                loginMessage: "",
                registerSucces: false
            }

        case "addWarn":
            return {
                ...state,
                loginMessage: action.data.loginMessage,
                registerSucces: false
            }    
        
        case "register_success":
            return {
                ...state,
                registerSucces: true,
                loginMessage: '注册成功，请登录'
            };

        case "register_fail":
            return {
                ...state,
                loginMessage: action.err.response.data.message
            };

        case "login_success":
            return {
                ...state,
                isLogin: true,
                username: action.data.username
            }

        case "login_fail":
            return {
                ...state,
                loginMessage: action.err.response.data.message
            }

        case "save_success":
            return {
                ...state,
                todoList: action.data.todolist
            }

        case "save_fail":
            return {
                ...state
            }

        case "getList_success":
            let todoListJson =  action.data.todolist;
            let tmp;
            try {
                tmp = JSON.parse(todoListJson);
            } catch (error) {
                tmp= [];
            }
            return {
                ...state,
                todoList: tmp
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