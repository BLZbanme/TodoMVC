const Sequelize = require('sequelize')
const sequelize = require('../utils/dbUtil.js');

const User = sequelize.define('users',{

    id:{
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

User.sync().then(()=>{
    console.log('User update successfully')  
}).catch(error => {
    console.log('User update failed', error)
})

module.exports = User;



