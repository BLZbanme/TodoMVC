const Koa = require('koa');
const koaBody = require('koa-body');
const jwt = require('koa-jwt');
const passport = require('koa-passport');
const session = require('koa-session');

const routes = require('./routes');
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

app.use(session(sessionConfig, app));

app.use(routes);

app.use(passport.initialize());
app.use(passport.session());

require('./utils/passport')(passport);

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})
// app.use(jwt({
//     secret
// }).unless({
//     path: [/\/register/, /\/login/]
// }))
