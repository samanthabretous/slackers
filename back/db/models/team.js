const User = require('./user');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING, 
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Team.belongsToMany(models.User, ({ through: 'Company' }))
        Team.hasMany(models.Chatroom)
      }
    }
  });
  return Team;
};