const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Reminder = sequelize.define('Reminder', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    note: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Reminder;
