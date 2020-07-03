const Koa = require('koa');
const koaBody = require('koa-body');
const jwt = require('koa-jwt');

const routes = require('./routes');
require('./models/User');

const app = new Koa();

app.use(koaBody({
    multipart: true,
    strict: false,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}))

app.use(routes);

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})
// app.use(jwt({
//     secret
// }).unless({
//     path: [/\/register/, /\/login/]
// }))
