const Sequelize = require("sequelize");

const connection = new Sequelize("question_guide", "root", "12345678", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;