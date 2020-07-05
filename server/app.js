const Koa = require('koa');
const koaBody = require('koa-body');
const passport = require('koa-passport');
const session = require('koa-session');

const router = require('./routes');
const cors = require('koa2-cors');
const { sessionConfig } = require('./config');
require('./models/User');

const app = new Koa();

app.keys = ['bytedance'];

app.use(koaBody({
    multipart: true,
    strict: false,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}))

app.use(cors());
app.use(session(sessionConfig, app));

app.use(router.routes()).use(router.allowedMethods());
app.use(passport.initialize());
app.use(passport.session());

require('./utils/passport')(passport);

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})
