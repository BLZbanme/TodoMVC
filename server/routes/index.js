const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const { v4: uuidv4} = require('uuid');

const enbcrypt = require('../utils/enbcrypt');
const validateRegisterInput = require('../validation/register');

const User = require('../models/User');


/**
* @route POST api/users/register
* @desc 测试接口地址
* @access 接口是公开的
*/
router.post('/register', async ctx => {
    console.log('register', ctx.request);
    const { errors, isValid } = validateRegisterInput(ctx.request.body);
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    let { username, password } = ctx.request.body;

    let user = await User.findOne({
        where: {
            username
        }
    })

    if (user) {
        ctx.status = 400;
        ctx.body = {"message": '用户名已存在'};
        return;
    }

    await User.create({
        id: uuidv4(),
        username,
        password: enbcrypt(password)
    }).then(() => {
        ctx.status = 200;
        ctx.body = {"message": 'OK'};
    }).catch(err => {
        ctx.status = 500;
        ctx.body = {"message": '注册用户数据库插入失败'};
    })

    return;
})

module.exports = router.routes();