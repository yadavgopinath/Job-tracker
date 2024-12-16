const Sequelize = require  ('sequelize');
const sequelize = require('../util/database');
const { type } = require('os');


const Application = sequelize.define('Application',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      application_no: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    job_title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    application_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    application_status: {
        type: Sequelize.ENUM,
        values: ['Applied', 'Interviewed', 'Offered', 'Rejected'],
        allowNull: false,
    }    
   
 
});
module.exports = Application;