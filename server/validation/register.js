const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!data.username || Validator.isEmpty(data.username)) {
        errors.username = '用户名不能为空'
    }
    else if (!Validator.isLength(data.username, {min: 2, max: 30})) {
        errors.username = '用户名不能小于2位，且不能超过30位';
    }

    if (!data.password || Validator.isEmpty(data.password)) {
        errors.password = 'password不能为空';
    }
    else if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'password长度不能小于6位，且不能超过30位'; 
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}