'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "models", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "created_models_table",
    "created": "2018-03-08T10:38:00.381Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "models",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "allowNull": false
            },
            "picture": {
                "type": Sequelize.STRING,
                "allowNull": false
            },
            "price": {
                "type": Sequelize.DECIMAL,
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
