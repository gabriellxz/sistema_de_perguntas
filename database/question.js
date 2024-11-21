const Sequelize = require("sequelize");
const connection = require("./database");

const question = connection.define("question", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

question.sync({force: false}).then(() => {});

module.exports = question;