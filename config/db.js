const sequalize = require('sequelize')

const db = new sequalize("crudnodejs","root","", {
    dialect: "mysql",

})

db.sync({})

module.exports = db