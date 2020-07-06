const Koa = require('koa');
const koaBody = require('koa-body');
const passport = require('koa-passport');
const session = require('koa-session');
const static = require('koa-static');


const router = require('./routes');
const cors = require('koa2-cors');
const { sessionConfig, serverPort } = require('./config');
require('./models/User');

const app = new Koa();

app.use(static('dist'));

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

app.listen(serverPort, () => {
    console.log(`server is running at http://localhost:${serverPort}`)
})
