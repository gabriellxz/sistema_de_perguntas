const Sequelize = require("sequelize");
const connection = require("./database");

const response = connection.define("response", {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

response.sync({ force: false }).then(() => {})

module.exports = response;