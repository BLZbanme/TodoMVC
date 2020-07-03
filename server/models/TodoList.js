const Sequelize = require('sequelize')
const sequelize = require('../utils/dbUtil.js');

const Todolist = sequelize.define('users',{

    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false
    },
    todolist: {
        type: Sequelize.JSON
    }

})

Todolist.sync().then(()=>{
    console.log('Todolist update successfully')  
}).catch(error => {
    console.log('Todolist update failed', error)
})

module.exports = Todolist;



