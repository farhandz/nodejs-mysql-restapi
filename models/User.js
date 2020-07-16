const Sequalize = require('sequelize');
const db = require('../config/db');


const user = db.define(
    "user",
    {
        username: {type: Sequalize.STRING},
        email: {type: Sequalize.STRING},
        password: {type: Sequalize.STRING},
    },
    {
        freezeTableName: true
    }
)


module.exports = user