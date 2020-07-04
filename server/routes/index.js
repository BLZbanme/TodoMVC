const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const { v4: uuidv4} = require('uuid');

const { secertKey } = require('../config');

const svgCaptcha = require('svg-captcha');

const enbcrypt = require('../utils/enbcrypt');
const validateRegisterInput = require('../validation/register');

const User = require('../models/User');

const autoCodeMap = new Map();

/**
* @route POST api/register
* @desc 测试接口地址
* @access 接口是公开的
*/
router.post('/register', async ctx => {

    const inputeAuthCode = ctx.request.body.authCode;

    if (!inputeAuthCode || (inputeAuthCode.toLowerCase() != ctx.session.autoCode)) {
        ctx.response.status = 401;
        ctx.response.body = { "message": '验证码错误' };
        return;
    }

    const { errors, isValid } = validateRegisterInput(ctx.request.body);
    if (!isValid) {
        ctx.response.status = 400;
        ctx.response.body = errors;
        return;
    }

    let { username, password } = ctx.request.body;

    let user = await User.findOne({
        where: {
            username
        }
    })

    if (user) {
        ctx.response.status = 400;
        ctx.response.body = { "message": '用户名已存在' };
        return;
    }

    await User.create({
        id: uuidv4(),
        username,
        password: enbcrypt(password),
        todolist: `[]`
    }).then(() => {
        ctx.response.status = 200;
        ctx.response.body = { "message": 'OK' };
    }).catch(() => {
        ctx.response.status = 500;
        ctx.response.body = { "message": '注册用户数据库插入失败' };
    })

    return;
})

/**
* @route POST api/login
* @desc 登录接口地址 返回token
* @access 接口是公开的
*/
router.post("/login", async ctx => {
    const user = await User.findOne({
        where: {
            username: ctx.request.body.username
        }
    })

    const password = ctx.request.body.password;

    if (user) {
        console.log(password);
        var result = await bcrypt.compareSync(password, user.password);
        if (result) {
            const payLoad = {
                id: user.id,
                username: user.username
            }
            const token = jwt.sign(payLoad, secertKey, { expiresIn: 3600 });
            ctx.status = 200;
            ctx.body = {
                success: true,
                token: 'Bearer ' + token
            }
            return;
        }
    }

    //user不存在，或者密码对比不相同
    ctx.response.status = 401;
    ctx.response.body = { message: '用户名或者密码错误' }
    return;
})

/**
* @route GET api/getList
* @desc 用户信息接口地址 返回用户信息
* @access 接口是私密的
*/
router.get("/getList", passport.authenticate('jwt', { session: false }),
    async (ctx) => {
        //utils中的jwt鉴权方式中回调传入的user
        const user = ctx.state.user;
        if (user) {
            ctx.response.status = 200;
            ctx.response.body = {
                todolist: user.todolist || `[]`
            };
        }
        else {
            ctx.response.status = 401;
            ctx.response.body = {message: '用户名已失效'}
        }
    }
)

/**
* @route GET api/getAuthCode
* @desc 用户信息接口地址 返回图片验证码
* @access 接口是公开
*/
router.get("/getAuthCode",  async ctx => {
    console.log("ctx.cookies", ctx.cookies);
    var authCode = svgCaptcha.create({
        inverse: false,
        fontSize: 36,
        noise: 1,
        width: 80,
        height: 30
    })
    ctx.session.autoCode = authCode.text.toLowerCase();
    console.log("ctx.session", ctx.session);
    
    ctx.response.set('Content-Type', 'image/svg+xml');
    ctx.response.body = String(authCode.data);
    ctx.response.status = 200;
})

module.exports = router.routes();