// const secertKey = 'bytedance';
// const dbName = 'todomvc';
// const username = 'root';
// const password = '123456';
// const ip = 'localhost';
// const port = 3307;

// const sessionConfig = {
//     key: 'koa:sess',
//     mazAge: 5 * 60 * 1000,
//     autoCommit: true,
//     overwrite: true,
//     httpOnly: true,
//     signed: true,
//     rolling: true,
//     renew: false
// }

// module.exports = {
//     secertKey,
//     dbName,
//     username,
//     password,
//     ip,
//     port,
//     sessionConfig
// };

const config = require('../../config.js');
console.log(config);
module.exports = config;