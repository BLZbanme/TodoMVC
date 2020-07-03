const Sequelize = require('sequelize');

const { dbName, username, password, ip, port} = require('../config');

const sequelize = new Sequelize(dbName, username, password, { 
    host: ip, 
    port,
    dialect:'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('db connected');
    })
    .catch(error => {
        console.error('db connected failed', error);
    }
);

module.exports = sequelize;
