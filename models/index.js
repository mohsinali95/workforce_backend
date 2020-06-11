
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
const bcrypt = require('bcryptjs')
const { databaseConfig } = require("../config/config")

// var env       = process.env.NODE_ENV || 'development';
var db = {};
require('dotenv').config()

const sequelize = new Sequelize(databaseConfig.dbName, databaseConfig.dbUsername, databaseConfig.dbPass, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  port: databaseConfig.port,
  logging: false

});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sync = function () {
  sequelize.sync({ alter: true ,force: false }).then((res) => {
    console.log('SYNC DONE',res);
  }).catch((e) => {
    console.log('ERROR SYNC', e);
  });
  // console.log("clearing db")
  // sequelize.sync({ force: true }).then(async () => {
  //   console.log("creating roles")
  //   let passHash = await bcrypt.hash("admin", 10)

  //   db.role.bulkCreate([{
  //     "name": "Super Admin"
  //   }, {
  //     "name": "Admin"
  //   }, {
  //     "name": "MOD"
  //   }]).then(() => {
  //     db.user.create({
  //       email: "admin@admin.com",
  //       password: passHash,
  //       name: "Super Admin",
  //       roleId: 1,
  //       isEmailVerfied: 1,
  //       isLoginAllowed: 1
  //     })

  //     db.industry.create({
  //       name: "Restaurant"
  //     })

  //   })
  // })

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;