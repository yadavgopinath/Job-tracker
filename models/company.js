const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Company = sequelize.define('Company', {
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_info: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,  
});

module.exports = Company;
